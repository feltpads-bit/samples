/**
 * Basic Usage Examples for Feltpads Samples with Strudel
 * 
 * These examples demonstrate how to use the sample library
 * with Strudel live coding patterns.
 */

import samples from '../index.js';

// Example 1: Basic drum pattern using sample paths
console.log('=== Example 1: Basic Drum Pattern ===');

// Get drum samples
const drums = samples.getSamplesByCategory('drums');
console.log('Available drums:', Object.keys(drums));

// Create a basic pattern (pseudo-Strudel syntax for demonstration)
const basicPattern = `
// Using feltpads samples in Strudel:
stack(
  sound("${drums.kick_808.path}").every(4, x => x),
  sound("${drums.snare_crisp.path}").when(1, x => x.late(0.5)),
  sound("${drums.hihat_closed.path}").fast(2)
)`;

console.log('Basic pattern:', basicPattern);

// Example 2: Melodic pattern with bass and lead
console.log('\n=== Example 2: Melodic Pattern ===');

const bass = samples.getSamplesByCategory('bass');
const melody = samples.getSamplesByCategory('melody');

const melodicPattern = `
// Melodic pattern with bass and lead:
stack(
  sound("${bass.bass_sub.path}").note("c2 f2 g2 f2").slow(2),
  sound("${melody.lead_pluck.path}").note("c4 e4 g4 c5").fast(2),
  sound("${melody.pad_warm.path}").note("c3 f3 g3").slow(4).gain(0.6)
)`;

console.log('Melodic pattern:', melodicPattern);

// Example 3: Random sample selection
console.log('\n=== Example 3: Random Sample Selection ===');

const randomDrum = samples.getRandomSample('drums');
const randomFx = samples.getRandomSample('fx');

console.log('Random drum sample:', randomDrum);
console.log('Random FX sample:', randomFx);

// Example 4: BPM-based selection
console.log('\n=== Example 4: BPM-based Selection ===');

const fastSamples = samples.getSamplesByBpm(128, 140);
console.log('Fast samples (128-140 BPM):');
Object.keys(fastSamples).forEach(category => {
  console.log(`  ${category}:`, Object.keys(fastSamples[category]));
});

// Example 5: Tag-based selection
console.log('\n=== Example 5: Tag-based Selection ===');

const analogSamples = samples.getSamplesByTags(['analog', 'vintage']);
console.log('Analog/Vintage samples:', analogSamples);

const ambientSamples = samples.getSamplesByTags('ambient');
console.log('Ambient samples:', ambientSamples);

// Example 6: Complex pattern with effects
console.log('\n=== Example 6: Complex Pattern with Effects ===');

const fx = samples.getSamplesByCategory('fx');
const percussion = samples.getSamplesByCategory('percussion');

const complexPattern = `
// Complex pattern with multiple layers:
stack(
  // Main drum pattern
  sound("${drums.kick_808.path} . ${drums.snare_crisp.path} .").fast(2),
  
  // Hi-hats and percussion
  sound("${drums.hihat_closed.path}").fast(4).gain(0.7),
  sound("${percussion.shaker_loop.path}").slow(2).gain(0.5),
  
  // Bass line
  sound("${bass.bass_acid.path}").note("c2 . f2 g2").lpf(800),
  
  // Melodic elements
  sound("${melody.arp_sequence.path}").note("c4 e4 g4 c5").slow(2).hpf(200),
  
  // Ambient texture
  sound("${melody.pad_warm.path}").note("c3").slow(8).gain(0.4).room(0.8),
  
  // Effects and transitions
  sound("${fx.riser_white.path}").when(7, x => x.gain(0.3)),
  sound("${fx.vocal_chop.path}").sometimes(x => x.speed(2))
)`;

console.log('Complex pattern:', complexPattern);

// Example 7: Sample library information
console.log('\n=== Example 7: Library Information ===');

console.log('Total samples:', samples.getAllSamples().totalSamples);
console.log('Available categories:', samples.getCategories());

// Display samples by category with details
samples.getCategories().forEach(category => {
  const categorySamples = samples.getSamplesByCategory(category);
  console.log(`\n${category.toUpperCase()}:`);
  Object.entries(categorySamples).forEach(([name, sample]) => {
    console.log(`  ${name}: ${sample.description} (${sample.duration}s, ${sample.bpm || 'free'}BPM)`);
  });
});