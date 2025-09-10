# Feltpads Samples

A carefully curated sample library designed for use with [Strudel](https://strudel.cc/) live coding. This library provides high-quality audio samples organized by category, with rich metadata and easy integration for algorithmic music creation.

## Features

- 🎵 **24 High-Quality Samples** across 6 categories
- 🏷️ **Rich Metadata** with BPM, key, duration, and tags
- 📦 **Easy Integration** with Strudel live coding
- 🔍 **Smart Search** by category, BPM, tags, and more
- 📚 **Ready-to-Use Patterns** for immediate creativity
- 🚀 **Modern ES Module** support

## Installation

```bash
npm install @feltpads/samples
```

## Quick Start

### Basic Usage

```javascript
import samples from '@feltpads/samples';

// Get all available samples
const allSamples = samples.getAllSamples();

// Get samples by category
const drums = samples.getSamplesByCategory('drums');
const bass = samples.getSamplesByCategory('bass');

// Get sample path for Strudel
const kickPath = samples.getSamplePath('kick_808');
```

### Using with Strudel

```javascript
// Basic drum pattern
stack(
  s("samples/drums/kick_808").gain(0.8),
  s("samples/drums/snare_crisp").when(1, x => x.late(0.5)),
  s("samples/drums/hihat_closed").fast(2).gain(0.6)
)

// Melodic pattern
stack(
  s("samples/bass/bass_sub").note("c2 f2 g2 f2").slow(2),
  s("samples/melody/lead_pluck").note("c4 e4 g4 c5").fast(2)
)
```

## Sample Categories

### 🥁 Drums
- **kick_808**: Deep 808-style kick drum
- **kick_analog**: Analog-style punchy kick  
- **snare_crisp**: Crisp and sharp snare drum
- **hihat_closed**: Tight closed hi-hat
- **hihat_open**: Open hi-hat with sustain

### 🔊 Bass
- **bass_sub**: Deep sub bass tone
- **bass_acid**: Acid-style filtered bass
- **bass_reese**: Reese-style growling bass

### 🎹 Melody  
- **lead_pluck**: Bright plucked lead sound
- **pad_warm**: Warm ambient pad
- **arp_sequence**: Rhythmic arpeggio sequence
- **bell_crystal**: Crystal bell tone

### ✨ FX
- **riser_white**: White noise riser sweep
- **crash_reverse**: Reverse crash cymbal  
- **vocal_chop**: Chopped vocal sample
- **glitch_stutter**: Digital glitch stutter

### 🥁 Percussion
- **conga_low**: Low conga drum hit
- **conga_high**: High conga drum hit
- **shaker_loop**: Shaker rhythm loop
- **cowbell_latin**: Latin-style cowbell

### 🌊 Ambient
- **texture_rain**: Rain texture ambient sound
- **drone_dark**: Dark atmospheric drone
- **field_recording**: Natural field recording

## API Reference

### Core Functions

#### `getAllSamples()`
Returns complete metadata for all samples.

#### `getSamplesByCategory(category)`
Get all samples in a specific category.
- `category`: 'drums', 'bass', 'melody', 'fx', 'percussion', or 'ambient'

#### `getSamplePath(sampleName)`  
Get the file path for a specific sample.
- `sampleName`: Name of the sample (e.g., 'kick_808')

#### `getSamplesByBpm(minBpm, maxBpm)`
Find samples within a BPM range.
- `minBpm`: Minimum BPM
- `maxBpm`: Maximum BPM

#### `getSamplesByTags(tags)`
Find samples matching specific tags.
- `tags`: String or array of tags to search for

#### `getCategories()`
Get list of all available categories.

#### `getRandomSample(category)`
Get a random sample from a category.
- `category`: Category to select from

### Search Examples

```javascript
// Find fast samples for breakbeat
const fastSamples = samples.getSamplesByBpm(128, 140);

// Find analog/vintage sounds  
const analogSamples = samples.getSamplesByTags(['analog', 'vintage']);

// Get ambient textures
const ambientSamples = samples.getSamplesByTags('ambient');

// Random drum for variation
const randomDrum = samples.getRandomSample('drums');
```

## Strudel Pattern Examples

The library includes ready-to-use pattern examples:

### House Pattern
```javascript
stack(
  s("samples/drums/kick_analog").gain(0.8),
  s("samples/drums/hihat_open").when(1, x => x.late(0.5)).gain(0.6),
  s("samples/bass/bass_sub").note("c1 . g1 .").lpf(400)
)
```

### Breakbeat Groove  
```javascript
stack(
  s("samples/drums/kick_808 . samples/drums/kick_808 .").mask("1 0 1 0"),
  s(". samples/drums/snare_crisp . samples/drums/snare_crisp"),
  s("samples/bass/bass_reese").note("c2 eb2 f2 g2").slow(4)
)
```

### Ambient Soundscape
```javascript
stack(
  s("samples/ambient/drone_dark").slow(8).room(0.9),
  s("samples/melody/bell_crystal").note("c4 g4 c5").slow(8).delay(0.3),
  s("samples/ambient/texture_rain").slow(16).gain(0.3)
)
```

More examples available in the `/examples` directory.

## Development

### Building Metadata
```bash
npm run build
```

### File Structure
```
samples/
├── drums/          # Drum samples
├── bass/           # Bass samples  
├── melody/         # Melodic samples
├── fx/             # Effect samples
├── percussion/     # Percussion samples
└── ambient/        # Ambient samples

metadata/
└── index.json      # Generated metadata

examples/
├── basic-usage.js      # API usage examples
└── strudel-patterns.js # Ready-to-use Strudel patterns
```

## Contributing

1. Add audio files to appropriate category folders
2. Run `npm run build` to update metadata
3. Add pattern examples if desired
4. Submit pull request

## License

MIT License - see LICENSE file for details.

## Compatibility

- **Strudel**: Compatible with Strudel live coding environment
- **Node.js**: ES Modules (Node 14+)
- **Browsers**: Modern browsers with ES Module support

## Related Projects

- [Strudel](https://strudel.cc/) - Live coding for algorithmic patterns
- [Tone.js](https://tonejs.github.io/) - Web Audio framework
- [Hydra](https://hydra.ojack.xyz/) - Live coding visuals

---

Made with ❤️ by feltpads for the live coding community
