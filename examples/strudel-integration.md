# Strudel Integration Guide

This guide shows how to integrate Feltpads Samples with Strudel live coding.

## Setup

### Option 1: Direct File References
The simplest way is to reference sample files directly in your Strudel patterns:

```javascript
// Basic pattern using file paths
s("samples/drums/kick_808 samples/drums/snare_crisp")
  .fast(2)
```

### Option 2: Using the JavaScript API
For more advanced usage, you can use the sample library API:

```javascript
// Import the library (in your setup)
import samples from '@feltpads/samples';

// Get sample paths programmatically  
const kick = samples.getSamplePath('kick_808');
const snare = samples.getSamplePath('snare_crisp');

// Use in patterns
s(`${kick} ${snare}`).fast(2)
```

### Option 3: Dynamic Sample Selection
Use the API for dynamic, algorithmic sample selection:

```javascript
// Random drum selection
const randomDrum = () => {
  const drum = samples.getRandomSample('drums');
  return drum.path;
};

// BPM-matched samples
const fastSamples = samples.getSamplesByBpm(128, 140);
```

## Complete Integration Examples

### 1. House Track Template

```javascript
// House pattern with Feltpads samples
stack(
  // Four-on-floor kick
  s("samples/drums/kick_analog")
    .gain(0.8),
  
  // Off-beat hi-hats  
  s("samples/drums/hihat_open")
    .when(1, x => x.late(0.5))
    .gain(0.6),
  
  // Closed hat subdivision
  s("samples/drums/hihat_closed")
    .fast(2)
    .gain(0.4),
    
  // Sub bass
  s("samples/bass/bass_sub")
    .note("c1 . g1 .")
    .lpf(400)
    .gain(0.7),
    
  // Pluck melody  
  s("samples/melody/lead_pluck")
    .note("c4 e4 g4 c5")
    .sometimes(silence)
    .delay(0.2)
)
```

### 2. Ambient Soundscape

```javascript
// Ambient composition
stack(
  // Main drone
  s("samples/ambient/drone_dark")
    .slow(8)
    .gain(0.7)
    .room(0.9),
    
  // Rain texture
  s("samples/ambient/texture_rain")  
    .slow(16)
    .gain(0.3)
    .hpf(200),
    
  // Sparse bells
  s("samples/melody/bell_crystal")
    .note("c4 g4 c5 g5")
    .slow(8)
    .sometimes(silence)
    .gain(0.4)
    .delay(0.3),
    
  // Field recording layer
  s("samples/ambient/field_recording")
    .slow(32) 
    .gain(0.2)
    .lpf(1000)
)
```

### 3. Breakbeat Groove

```javascript  
// Breakbeat pattern
stack(
  // Kick pattern
  s("samples/drums/kick_808 . samples/drums/kick_808 .")
    .mask("1 0 1 0")
    .gain(0.9),
    
  // Snare with variations
  s(". samples/drums/snare_crisp . samples/drums/snare_crisp")
    .sometimes(x => x.early(0.125))
    .gain(0.8),
    
  // Reese bass
  s("samples/bass/bass_reese")
    .note("c2 eb2 f2 g2")
    .slow(4)
    .lpf(sine.range(200, 800))
    .gain(0.6),
    
  // Percussion accents
  s("samples/percussion/shaker_loop")
    .slow(2)
    .gain(0.5)
)
```

### 4. Glitch Electronica

```javascript
// Glitch pattern
stack(
  // Stuttered kick
  s("samples/drums/kick_analog")
    .sometimes(x => x.chop(8).rev())
    .gain(0.8),
    
  // Glitch stutters
  s("samples/fx/glitch_stutter")
    .fast(4)
    .sometimes(x => x.speed(0.5)),
    
  // Vocal chops
  s("samples/fx/vocal_chop")  
    .chop(16)
    .sometimes(x => x.rev())
    .gain(0.7),
    
  // Arpeggiated lead
  s("samples/melody/arp_sequence")
    .speed(perlin.range(0.5, 2))
    .hpf(sine.range(100, 2000))
    .gain(0.5)
)
```

## Tips for Live Coding

### 1. Pre-assign Sample Variables
```javascript  
// Set up shortcuts for common samples
const k = "samples/drums/kick_808";
const s = "samples/drums/snare_crisp"; 
const h = "samples/drums/hihat_closed";

// Use in patterns
sound(`${k} . ${s} .`).fast(2)
```

### 2. Create Sample Groups
```javascript
// Group related samples
const drums = [
  "samples/drums/kick_808",
  "samples/drums/kick_analog" 
];

const bass = [
  "samples/bass/bass_sub",
  "samples/bass/bass_acid"
];

// Randomly select from groups
s(choose(drums)).gain(0.8)
s(choose(bass)).note("c2 f2").slow(2)
```

### 3. BPM-Aware Patterns
```javascript
// Match sample BPM to pattern tempo
// (requires custom integration with sample metadata)

// Fast patterns for 128+ BPM samples  
s("samples/bass/bass_acid samples/melody/arp_sequence")
  .fast(2)

// Slower patterns for ambient samples
s("samples/ambient/drone_dark")
  .slow(8)
```

### 4. Dynamic Effects Based on Sample Tags
```javascript
// Apply effects based on sample characteristics
// Analog samples get vintage effects
s("samples/drums/kick_analog")
  .shape(0.3)      // Analog distortion
  .lpf(2000)       // Vintage filtering

// Digital samples get modern effects  
s("samples/fx/glitch_stutter")
  .delay(0.125)    // Digital delay
  .hpf(sine.range(100, 1000))
```

## Advanced Techniques

### 1. Conditional Sample Loading
```javascript
// Load different samples based on conditions
const currentBPM = 128;
const suitableSamples = samples.getSamplesByBpm(currentBPM - 10, currentBPM + 10);

// Use tempo-appropriate bass
const bassChoices = Object.keys(suitableSamples.bass || {});
s(choose(bassChoices.map(name => suitableSamples.bass[name].path)))
```

### 2. Tag-Based Pattern Generation  
```javascript
// Get all ambient samples
const ambientSamples = samples.getSamplesByTags('ambient');

// Create evolving ambient pattern
stack(
  ...Object.values(ambientSamples.melody || {}).map(sample =>
    s(sample.path).slow(rand.range(8, 16)).gain(0.3)
  )
)
```

### 3. Cross-Category Layering
```javascript  
// Layer samples from different categories intelligently
const createLayer = (category, note, effects = {}) => {
  const categorySamples = samples.getSamplesByCategory(category);
  const sampleNames = Object.keys(categorySamples);
  const randomSample = categorySamples[choose(sampleNames)];
  
  return s(randomSample.path).note(note).gain(0.6);
};

// Build layered composition
stack(
  createLayer('drums', 'c2'),
  createLayer('bass', 'c1'),  
  createLayer('melody', 'c4')
)
```

---

This integration guide provides a comprehensive foundation for using Feltpads Samples with Strudel. The samples are designed to work seamlessly with Strudel's pattern language and provide rich material for live coding performances.