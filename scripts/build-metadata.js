#!/usr/bin/env node

/**
 * Build Script for Sample Metadata
 * 
 * This script scans the samples directory and automatically generates
 * or updates the metadata index file based on actual audio files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Audio file extensions to look for
const audioExtensions = ['.wav', '.mp3', '.flac', '.ogg', '.aif', '.aiff'];

// Default metadata for different categories
const defaultMetadata = {
  drums: {
    bpm: 120,
    duration: 0.5,
    key: 'C',
    tags: ['drum', 'percussive']
  },
  bass: {
    bpm: 120,
    duration: 1.0,
    key: 'C',
    tags: ['bass', 'low']
  },
  melody: {
    bpm: 120,
    duration: 2.0,
    key: 'C',
    tags: ['melodic', 'harmonic']
  },
  fx: {
    bpm: 120,
    duration: 2.0,
    key: null,
    tags: ['fx', 'effect']
  },
  percussion: {
    bpm: 120,
    duration: 0.8,
    key: null,
    tags: ['percussion', 'rhythm']
  },
  ambient: {
    bpm: null,
    duration: 10.0,
    key: null,
    tags: ['ambient', 'atmospheric']
  }
};

/**
 * Scan directory for audio files
 */
function scanAudioFiles(directory) {
  const files = [];
  
  try {
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (audioExtensions.includes(ext)) {
          files.push({
            name: path.basename(item, ext),
            filename: item,
            path: path.relative(rootDir, fullPath).replace(/\\/g, '/'),
            fullPath: fullPath
          });
        }
      } else if (stat.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = scanAudioFiles(fullPath);
        files.push(...subFiles);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${directory}: ${error.message}`);
  }
  
  return files;
}

/**
 * Generate sample name from filename
 */
function generateSampleName(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Guess metadata from filename and path
 */
function guessMetadata(file, category) {
  const defaults = defaultMetadata[category] || defaultMetadata.fx;
  const filename = file.name.toLowerCase();
  
  // Guess BPM from filename
  let bpm = defaults.bpm;
  const bpmMatch = filename.match(/(\d{2,3})bpm|bpm(\d{2,3})|(\d{2,3})_bpm/);
  if (bpmMatch) {
    bpm = parseInt(bpmMatch[1] || bpmMatch[2] || bpmMatch[3]);
  }
  
  // Guess key from filename
  let key = defaults.key;
  const keyMatch = filename.match(/([a-g]#?m?)(\_|$)/);
  if (keyMatch) {
    key = keyMatch[1].toUpperCase();
  }
  
  // Generate tags based on filename
  const tags = [...defaults.tags];
  
  // Add descriptive tags based on common keywords
  const tagKeywords = {
    '808': ['808', 'sub'],
    'analog': ['analog', 'vintage'],
    'crisp': ['crisp', 'sharp'],
    'deep': ['deep', 'low'],
    'acid': ['acid', 'resonant'],
    'pad': ['pad', 'warm'],
    'pluck': ['pluck', 'bright'],
    'bell': ['bell', 'metallic'],
    'riser': ['riser', 'sweep'],
    'glitch': ['glitch', 'digital'],
    'ambient': ['ambient', 'atmospheric']
  };
  
  Object.entries(tagKeywords).forEach(([keyword, keywordTags]) => {
    if (filename.includes(keyword)) {
      tags.push(...keywordTags);
    }
  });
  
  // Remove duplicates
  const uniqueTags = [...new Set(tags)];
  
  return {
    path: `./${file.path}`,
    bpm: bpm,
    duration: defaults.duration,
    key: key,
    tags: uniqueTags,
    description: `Generated from ${file.filename}`
  };
}

/**
 * Build metadata for all samples
 */
function buildMetadata() {
  const samplesDir = path.join(rootDir, 'samples');
  const categories = {};
  let totalSamples = 0;
  
  // Scan each category directory
  const categoryDirs = fs.readdirSync(samplesDir);
  
  for (const categoryDir of categoryDirs) {
    const categoryPath = path.join(samplesDir, categoryDir);
    const stat = fs.statSync(categoryPath);
    
    if (!stat.isDirectory()) continue;
    
    console.log(`Scanning category: ${categoryDir}`);
    const audioFiles = scanAudioFiles(categoryPath);
    
    if (audioFiles.length === 0) {
      console.log(`  No audio files found in ${categoryDir}`);
      categories[categoryDir] = {};
      continue;
    }
    
    categories[categoryDir] = {};
    
    for (const file of audioFiles) {
      const sampleName = generateSampleName(file.name);
      const metadata = guessMetadata(file, categoryDir);
      
      categories[categoryDir][sampleName] = metadata;
      totalSamples++;
      
      console.log(`  Added: ${sampleName} (${file.filename})`);
    }
  }
  
  // Build complete metadata object
  const metadata = {
    name: '@feltpads/samples',
    version: '1.0.0',
    description: 'Sample library for Strudel live coding',
    totalSamples: totalSamples,
    categories: categories,
    generatedAt: new Date().toISOString()
  };
  
  // Generate tags index
  const allTags = new Set();
  const tagsByCategory = {};
  
  Object.entries(categories).forEach(([category, samples]) => {
    const categoryTags = new Set();
    
    Object.values(samples).forEach(sample => {
      if (sample.tags) {
        sample.tags.forEach(tag => {
          allTags.add(tag);
          categoryTags.add(tag);
        });
      }
    });
    
    tagsByCategory[category] = Array.from(categoryTags).sort();
  });
  
  metadata.tags = {
    all: Array.from(allTags).sort(),
    byCategory: tagsByCategory
  };
  
  return metadata;
}

/**
 * Main build function
 */
function main() {
  console.log('Building sample metadata...\n');
  
  try {
    const metadata = buildMetadata();
    
    // Write metadata file
    const metadataPath = path.join(rootDir, 'metadata', 'index.json');
    const metadataDir = path.dirname(metadataPath);
    
    // Ensure metadata directory exists
    if (!fs.existsSync(metadataDir)) {
      fs.mkdirSync(metadataDir, { recursive: true });
    }
    
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    console.log('\n✅ Metadata build complete!');
    console.log(`📊 Total samples: ${metadata.totalSamples}`);
    console.log(`📂 Categories: ${Object.keys(metadata.categories).join(', ')}`);
    console.log(`🏷️  Total tags: ${metadata.tags.all.length}`);
    console.log(`📄 Metadata written to: ${metadataPath}`);
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}