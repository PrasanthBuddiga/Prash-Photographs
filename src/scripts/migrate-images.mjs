import 'dotenv/config';
import * as prismic from '@prismicio/client';
import fs from 'node:fs';
import path from 'node:path';

const repositoryName = 'prashphotographs';

const writeClient = prismic.createWriteClient(repositoryName, {
	writeToken: process.env.PRISMIC_WRITE_TOKEN,
});

const foldersToMigrate = [
	{ dir: 'old_project/img/land', category: 'travel', altPrefix: 'Travel photograph' },
	// { dir: 'old_project/img/theme', category: 'conceptual', altPrefix: 'Conceptual photograph' },
	// { dir: 'old_project/img/comm', category: 'portraits', altPrefix: 'Wedding and portrait photograph' },
	// { dir: 'old_project/img/mobile', category: 'travel', altPrefix: 'Travel photograph' },
];

const CHUNK_SIZE = 5;
let sortOrder = 1;

function chunkArray(arr, size) {
	const chunks = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
}

async function migrateChunk(files, dir, category, altPrefix) {
	const migration = prismic.createMigration();

	for (const file of files) {
		const filePath = path.join(dir, file);
		const fileBuffer = fs.readFileSync(filePath);
		const asset = migration.createAsset(fileBuffer, file);

		migration.createDocument(
			{
				type: 'gallery_photo',
				lang: 'en-us',
				data: {
					image: asset,
					alt_text: altPrefix,
					category: category,
					sort_order: sortOrder,
				},
			},
			file
		);
		sortOrder++;
	}

	let attempts = 0;
	while (attempts < 4) {
		try {
			await writeClient.migrate(migration, {
				reporter: (event) => console.log(' ', event.type, event.data?.current ?? ''),
			});
			return;
		} catch (err) {
			attempts++;
			console.warn(`  ⚠️  Chunk attempt ${attempts} failed: ${err.message}`);
			if (attempts >= 4) throw err;
			await new Promise((r) => setTimeout(r, 4000));
		}
	}
}

async function migrateFolder({ dir, category, altPrefix }) {
	const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));
	const chunks = chunkArray(files, CHUNK_SIZE);

	console.log(`Migrating ${files.length} images for "${category}" from ${dir} in ${chunks.length} chunks...`);

	for (let i = 0; i < chunks.length; i++) {
		console.log(`Chunk ${i + 1}/${chunks.length} (${chunks[i].length} images)`);
		await migrateChunk(chunks[i], dir, category, altPrefix);
		console.log(`  ✅ Chunk ${i + 1} done`);
		// small pause between chunks to avoid rate limiting
		await new Promise((r) => setTimeout(r, 1500));
	}

	console.log(`✅ Finished all of ${dir}`);
}

for (const folder of foldersToMigrate) {
	await migrateFolder(folder);
}

console.log('🎉 All migrations complete! Check the Migration Releases tab in Prismic.');