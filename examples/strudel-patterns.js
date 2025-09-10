/**
 * Strudel Pattern Examples using Feltpads Samples
 * 
 * Ready-to-use patterns for Strudel live coding
 * Copy and paste these into your Strudel environment
 */

// Import the sample library (adjust path as needed)
// import samples from '@feltpads/samples';

/**
 * Pattern 1: Basic House Beat
 * A classic four-on-the-floor house pattern
 */
export const housePattern = `
stack(
  // Kick on every beat
  s("samples/drums/kick_analog").gain(0.8),
  
  // Open hihat on off-beats
  s("samples/drums/hihat_open").when(1, x => x.late(0.5)).gain(0.6),
  
  // Closed hihat subdivision
  s("samples/drums/hihat_closed").fast(2).gain(0.4),
  
  // Bass on root and fifth
  s("samples/bass/bass_sub").note("c1 . g1 .").lpf(400).gain(0.7)
)`;

/**
 * Pattern 2: Breakbeat Groove
 * Classic breakbeat pattern with Amen-style rhythm
 */
export const breakbeatPattern = `
stack(
  // Kick pattern
  s("samples/drums/kick_808 . samples/drums/kick_808 .").mask("1 0 1 0").gain(0.9),
  
  // Snare on 2 and 4 with ghost notes
  s(". samples/drums/snare_crisp . samples/drums/snare_crisp")
    .sometimes(x => x.early(0.125)).gain(0.8),
  
  // Complex hihat pattern
  s("samples/drums/hihat_closed").euclid(5, 8).gain(0.5),
  
  // Reese bass with movement
  s("samples/bass/bass_reese").note("c2 eb2 f2 g2")
    .slow(4).lpf(sine.range(200, 800)).gain(0.6)
)`;

/**
 * Pattern 3: Ambient Drone
 * Atmospheric ambient soundscape
 */
export const ambientPattern = `
stack(
  // Main drone
  s("samples/ambient/drone_dark").slow(8).gain(0.7).room(0.9),
  
  // Texture layers
  s("samples/ambient/texture_rain").slow(16).gain(0.3).hpf(200),
  
  // Sparse melodic elements
  s("samples/melody/bell_crystal").note("c4 g4 c5 g5")
    .slow(8).sometimes(silence).gain(0.4).delay(0.3),
  
  // Field recording texture
  s("samples/ambient/field_recording").slow(32).gain(0.2).lpf(1000)
)`;

/**
 * Pattern 4: Latin Percussion Groove
 * Rhythmic pattern featuring latin percussion
 */
export const latinPattern = `
stack(
  // Conga pattern
  s("samples/percussion/conga_low samples/percussion/conga_high")
    .fast(2).sometimes(x => x.speed(1.2)).gain(0.7),
  
  // Cowbell accent
  s("samples/percussion/cowbell_latin").euclid(3, 8).gain(0.6),
  
  // Shaker groove
  s("samples/percussion/shaker_loop").slow(2).gain(0.5),
  
  // Bass complement
  s("samples/bass/bass_sub").note("c2 f2 g2 c2").slow(2).gain(0.6)
)`;

/**
 * Pattern 5: Glitch Electronica
 * Digital glitch pattern with stutters and chops
 */
export const glitchPattern = `
stack(
  // Stuttered kick
  s("samples/drums/kick_analog").sometimes(x => x.chop(8).rev()).gain(0.8),
  
  // Glitch effects
  s("samples/fx/glitch_stutter").fast(4).sometimes(x => x.speed(0.5)),
  
  // Vocal chops
  s("samples/fx/vocal_chop").chop(16).sometimes(x => x.rev()).gain(0.7),
  
  // Arpeggiated melody with effects
  s("samples/melody/arp_sequence").speed(perlin.range(0.5, 2))
    .hpf(sine.range(100, 2000)).gain(0.5)
)`;

/**
 * Pattern 6: Acid Techno
 * Acid house style pattern with filtered bass
 */
export const acidPattern = `
stack(
  // Hard kick
  s("samples/drums/kick_808").gain(0.9).shape(0.3),
  
  // Acid bass with filter automation
  s("samples/bass/bass_acid").note("c2 c2 f2 g2")
    .lpf(sine.slow(4).range(200, 2000))
    .resonance(0.8).gain(0.7),
  
  // Closed hihat rhythm
  s("samples/drums/hihat_closed").euclid(7, 8).gain(0.6),
  
  // Occasional crash
  s("samples/fx/crash_reverse").mask("0 0 0 1").slow(4).gain(0.5)
)`;

/**
 * Pattern 7: Melodic Techno
 * Deep, melodic techno with evolving pads
 */
export const melodicTechnoPattern = `
stack(
  // Deep kick
  s("samples/drums/kick_analog").gain(0.8),
  
  // Evolving pad
  s("samples/melody/pad_warm").note("c3 f3 g3 bb3")
    .slow(8).lpf(cosine.slow(16).range(300, 1200)).gain(0.5),
  
  // Pluck melody
  s("samples/melody/lead_pluck").note("c4 eb4 f4 g4 bb4 c5")
    .slow(2).sometimes(silence).delay(0.2).gain(0.6),
  
  // Subtle percussion
  s("samples/percussion/shaker_loop").slow(4).gain(0.3).hpf(500),
  
  // Riser builds
  s("samples/fx/riser_white").mask("0 0 0 1").slow(8).gain(0.4)
)`;

/**
 * Pattern 8: Minimal Techno
 * Stripped down minimal techno groove
 */
export const minimalPattern = `
stack(
  // Minimal kick pattern
  s("samples/drums/kick_analog . . samples/drums/kick_analog").gain(0.9),
  
  // Sparse hihat
  s("samples/drums/hihat_closed").euclid(3, 8).gain(0.5),
  
  // Sub bass pulse
  s("samples/bass/bass_sub").note("c1").mask("1 0 0 1").gain(0.7),
  
  // Textural element
  s("samples/ambient/texture_rain").slow(32).gain(0.2).hpf(1000)
)`;

/**
 * Usage in Strudel:
 * 
 * 1. Copy any of the above patterns
 * 2. Paste into Strudel editor
 * 3. Make sure the sample paths match your setup
 * 4. Press play and enjoy!
 * 
 * Tips for customization:
 * - Change .note() values for different melodies
 * - Adjust .gain() for volume balance
 * - Use .sometimes(), .often(), .rarely() for variation
 * - Add effects like .delay(), .reverb(), .lpf(), .hpf()
 * - Experiment with .speed(), .chop(), .rev() for texture
 */