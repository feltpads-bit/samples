/**
 * Feltpads Samples - Sample library for Strudel
 * 
 * This library provides a collection of audio samples organized for use
 * with Strudel live coding patterns.
 */

import metadata from './metadata/index.json' with { type: 'json' };

/**
 * Get all available samples metadata
 * @returns {Object} Complete samples metadata
 */
export function getAllSamples() {
  return metadata;
}

/**
 * Get samples by category
 * @param {string} category - Category name (drums, bass, melody, fx, percussion, ambient)
 * @returns {Object} Samples in the specified category
 */
export function getSamplesByCategory(category) {
  return metadata.categories[category] || {};
}

/**
 * Get sample path by name
 * @param {string} sampleName - Name of the sample
 * @returns {string|null} Path to the sample file or null if not found
 */
export function getSamplePath(sampleName) {
  for (const category of Object.keys(metadata.categories)) {
    const samples = metadata.categories[category];
    if (samples[sampleName]) {
      return samples[sampleName].path;
    }
  }
  return null;
}

/**
 * Get samples by BPM range
 * @param {number} minBpm - Minimum BPM
 * @param {number} maxBpm - Maximum BPM
 * @returns {Object} Samples within the BPM range
 */
export function getSamplesByBpm(minBpm, maxBpm) {
  const result = {};
  
  for (const category of Object.keys(metadata.categories)) {
    const samples = metadata.categories[category];
    for (const [name, sample] of Object.entries(samples)) {
      if (sample.bpm >= minBpm && sample.bpm <= maxBpm) {
        if (!result[category]) result[category] = {};
        result[category][name] = sample;
      }
    }
  }
  
  return result;
}

/**
 * Get samples by tags
 * @param {string|string[]} tags - Tag or array of tags to search for
 * @returns {Object} Samples matching the specified tags
 */
export function getSamplesByTags(tags) {
  const searchTags = Array.isArray(tags) ? tags : [tags];
  const result = {};
  
  for (const category of Object.keys(metadata.categories)) {
    const samples = metadata.categories[category];
    for (const [name, sample] of Object.entries(samples)) {
      if (sample.tags && searchTags.some(tag => sample.tags.includes(tag))) {
        if (!result[category]) result[category] = {};
        result[category][name] = sample;
      }
    }
  }
  
  return result;
}

/**
 * List all available categories
 * @returns {string[]} Array of category names
 */
export function getCategories() {
  return Object.keys(metadata.categories);
}

/**
 * Get random sample from a category
 * @param {string} category - Category name
 * @returns {Object|null} Random sample object or null if category is empty
 */
export function getRandomSample(category) {
  const samples = getSamplesByCategory(category);
  const sampleNames = Object.keys(samples);
  
  if (sampleNames.length === 0) return null;
  
  const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
  return {
    name: randomName,
    ...samples[randomName]
  };
}

// Default export for convenience
export default {
  getAllSamples,
  getSamplesByCategory,
  getSamplePath,
  getSamplesByBpm,
  getSamplesByTags,
  getCategories,
  getRandomSample,
  metadata
};