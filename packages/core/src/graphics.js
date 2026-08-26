/**
 * @codbdocs/core — Graphics State & Color Management
 *
 * Full graphics state preservation including:
 * - Transforms (translation, rotation, scaling, skew)
 * - Clipping paths
 * - Transparency / blend modes
 * - Color management (RGB, CMYK, ICC, patterns, shadings)
 */

// ─── Color Space Types ───────────────────────────────────────────────────────

export const ColorSpaceTypes = {
  DEVICE_RGB: 'DeviceRGB',
  DEVICE_CMYK: 'DeviceCMYK',
  DEVICE_GRAY: 'DeviceGray',
  ICC_BASED: 'ICCBased',
  CAL_GRAY: 'CalGray',
  CAL_RGB: 'CalRGB',
  LAB: 'Lab',
  SEPARATION: 'Separation',
  DEVICE_N: 'DeviceN',
  INDEXED: 'Indexed',
  PATTERN: 'Pattern',
};

// ─── Graphics State ──────────────────────────────────────────────────────────

/**
 * Create a default graphics state.
 */
export function createGraphicsState() {
  return {
    transform: [1, 0, 0, 1, 0, 0],
    stroke: {
      colorSpace: ColorSpaceTypes.DEVICE_RGB,
      color: [0, 0, 0],
      width: 1,
      cap: 'butt',
      join: 'miter',
      dash: [],
      dashPhase: 0,
    },
    fill: {
      colorSpace: ColorSpaceTypes.DEVICE_RGB,
      color: [0, 0, 0],
    },
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    dash: [],
    dashPhase: 0,
    opacity: 1,
    strokeOpacity: 1,
    fillOpacity: 1,
    blendMode: 'Normal',
    clip: null,
    clipPath: [],
    softMask: null,
    transparencyGroup: null,
    renderingIntent: 'RelativeColorimetric',
    overprint: false,
    overprintMode: 0,
  };
}

/**
 * Push graphics state (save current state).
 */
export function pushGraphicsState(state) {
  return JSON.parse(JSON.stringify(state));
}

/**
 * Pop graphics state (restore previous state).
 */
export function popGraphicsState(stack) {
  return stack.pop() || createGraphicsState();
}

/**
 * Apply transform to graphics state.
 */
export function applyTransform(state, transform) {
  if (!transform || transform.length < 6) return state;
  
  // Matrix multiplication: current * new
  const [a, b, c, d, e, f] = state.transform;
  const [a2, b2, c2, d2, e2, f2] = transform;
  
  state.transform = [
    a * a2 + c * b2,
    b * a2 + d * b2,
    a * c2 + c * d2,
    b * c2 + d * d2,
    a * e2 + c * f2 + e,
    b * e2 + d * f2 + f,
  ];
  
  return state;
}

/**
 * Apply clipping path.
 */
export function applyClip(state, clipPath, clipRule) {
  state.clip = {
    path: clipPath,
    rule: clipRule || 'winding',
  };
  state.clipPath.push(state.clip);
  return state;
}

// ─── Color Conversion ────────────────────────────────────────────────────────

/**
 * Convert CMYK to RGB.
 */
export function cmykToRgb(c, m, y, k) {
  const r = 255 * (1 - c / 100) * (1 - k / 100);
  const g = 255 * (1 - m / 100) * (1 - k / 100);
  const b = 255 * (1 - y / 100) * (1 - k / 100);
  return [Math.round(r), Math.round(g), Math.round(b)];
}

/**
 * Convert RGB to CMYK.
 */
export function rgbToCmyk(r, g, b) {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  
  const k = 1 - Math.max(rr, gg, bb);
  if (k === 1) return [0, 0, 0, 100];
  
  const c = (1 - rr - k) / (1 - k) * 100;
  const m = (1 - gg - k) / (1 - k) * 100;
  const y = (1 - bb - k) / (1 - k) * 100;
  
  return [Math.round(c), Math.round(m), Math.round(y), Math.round(k * 100)];
}

/**
 * Convert Lab to RGB (D50 illuminant).
 */
export function labToRgb(l, a, b) {
  // Lab to XYZ (D50)
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  
  const delta = 6 / 29;
  const delta3 = delta * delta * delta;
  
  const x = (fx > delta ? fx * fx * fx : (fx - 16 / 116) * 3 * delta * delta) * 0.95047;
  const y = (fy > delta ? fy * fy * fy : (fy - 16 / 116) * 3 * delta * delta);
  const z = (fz > delta ? fz * fz * fz : (fz - 16 / 116) * 3 * delta * delta) * 1.08883;
  
  // XYZ to RGB (D65)
  const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  const bv = x * 0.0557 + y * -0.2040 + z * 1.0570;
  
  return [
    Math.round(Math.min(255, Math.max(0, r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92) * 255)),
    Math.round(Math.min(255, Math.max(0, g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92) * 255)),
    Math.round(Math.min(255, Math.max(0, bv > 0.0031308 ? 1.055 * Math.pow(bv, 1 / 2.4) - 0.055 : bv * 12.92) * 255)),
  ];
}

/**
 * Convert color to RGB based on color space.
 */
export function toRgb(color, colorSpace) {
  if (!color) return [0, 0, 0];
  
  switch (colorSpace) {
    case ColorSpaceTypes.DEVICE_RGB:
      return color;
    case ColorSpaceTypes.DEVICE_CMYK:
      return cmykToRgb(color[0], color[1], color[2], color[3]);
    case ColorSpaceTypes.DEVICE_GRAY:
      return [color[0] * 255, color[0] * 255, color[0] * 255];
    case ColorSpaceTypes.LAB:
      return labToRgb(color[0], color[1], color[2]);
    default:
      return color.slice(0, 3);
  }
}

/**
 * Parse PDF color from operator arguments.
 */
export function parseColor(args, colorSpace) {
  if (!args || args.length === 0) return null;
  
  switch (colorSpace) {
    case ColorSpaceTypes.DEVICE_RGB:
      return { colorSpace, color: args.slice(0, 3) };
    case ColorSpaceTypes.DEVICE_CMYK:
      return { colorSpace, color: args.slice(0, 4) };
    case ColorSpaceTypes.DEVICE_GRAY:
      return { colorSpace, color: [args[0]] };
    default:
      return { colorSpace: ColorSpaceTypes.DEVICE_RGB, color: args.slice(0, 3) };
  }
}

// ─── Transparency ────────────────────────────────────────────────────────────

/**
 * Parse blend mode from PDF name.
 */
export function parseBlendMode(name) {
  const modes = {
    'Normal': 'Normal',
    'Multiply': 'Multiply',
    'Screen': 'Screen',
    'Overlay': 'Overlay',
    'Darken': 'Darken',
    'Lighten': 'Lighten',
    'ColorDodge': 'ColorDodge',
    'ColorBurn': 'ColorBurn',
    'HardLight': 'HardLight',
    'SoftLight': 'SoftLight',
    'Difference': 'Difference',
    'Exclusion': 'Exclusion',
    'Hue': 'Hue',
    'Saturation': 'Saturation',
    'Color': 'Color',
    'Luminosity': 'Luminosity',
  };
  return modes[name] || 'Normal';
}

/**
 * Create soft mask object.
 */
export function createSoftMask(type, bbox, transform) {
  return {
    type: 'SoftMask',
    subtype: type, // Luminosity or Alpha
    bbox,
    transform,
    group: null,
    backDrop: [0, 0, 0],
    matte: [0, 0, 0],
  };
}

/**
 * Create transparency group.
 */
export function createTransparencyGroup(bbox, isolated, knockout) {
  return {
    type: 'TransparencyGroup',
    bbox,
    isolated: isolated || false,
    knockout: knockout || false,
    colorSpace: null,
    group: null,
  };
}

// ─── Patterns & Shadings ────────────────────────────────────────────────────

/**
 * Create tiling pattern.
 */
export function createTilingPattern(type, bbox, xStep, yStep, paintType, tilingType) {
  return {
    type: 'TilingPattern',
    subtype: type,
    bbox,
    xStep,
    yStep,
    paintType: paintType || 1, // 1=colored, 2=uncolored
    tilingType: tilingType || 1, // 1=constant, 2=constant spacing, 3=auto flow
    matrix: [1, 0, 0, 1, 0, 0],
    resources: {},
  };
}

/**
 * Create gradient shading (axial or radial).
 */
export function createGradientShading(type, coords, domain, colors, functions) {
  return {
    type: 'GradientShading',
    subtype: type, // Axial or Radial
    coords,
    domain: domain || [0, 1],
    colors, // Array of { offset, color }
    functions,
    extend: [false, false],
  };
}

/**
 * Parse shading from PDF args.
 */
export function parseShading(args) {
  if (!args || args.length < 4) return null;
  
  const type = args[0];
  
  if (type === 1 || type === 2) {
    // Axial or Radial shading
    return createGradientShading(
      type === 1 ? 'Axial' : 'Radial',
      args.slice(1, type === 1 ? 5 : 7),
      [0, 1],
      [],
      null
    );
  }
  
  return null;
}

// ─── Full Graphics State Extraction ──────────────────────────────────────────

/**
 * Extract complete graphics state from PDF operator list.
 */
export function extractGraphicsState(opList) {
  const states = [];
  let currentState = createGraphicsState();
  const stateStack = [];
  
  const OPS = (typeof pdfjsLib !== 'undefined') ? pdfjsLib.OPS || {} : {};
  
  for (let i = 0; i < opList.fnArray.length; i++) {
    const fn = opList.fnArray[i];
    const args = opList.argsArray[i];
    
    // Save/Restore state
    if (fn === OPS.save || fn === 19) {
      stateStack.push(pushGraphicsState(currentState));
    } else if (fn === OPS.restore || fn === 20) {
      currentState = popGraphicsState(stateStack);
    }
    
    // Transform
    else if (fn === OPS.transform || fn === 8) {
      if (args && args.length >= 6) {
        currentState = applyTransform(currentState, args);
      }
    }
    
    // Stroke color
    else if (fn === OPS.setStrokeRGBColor || fn === 16) {
      currentState.stroke.colorSpace = ColorSpaceTypes.DEVICE_RGB;
      currentState.stroke.color = args ? args.slice(0, 3) : [0, 0, 0];
    }
    else if (fn === OPS.setStrokeCMYKColor || fn === 17) {
      currentState.stroke.colorSpace = ColorSpaceTypes.DEVICE_CMYK;
      currentState.stroke.color = args ? args.slice(0, 4) : [0, 0, 0, 0];
    }
    else if (fn === OPS.setFillRGBColor || fn === 4) {
      currentState.fill.colorSpace = ColorSpaceTypes.DEVICE_RGB;
      currentState.fill.color = args ? args.slice(0, 3) : [0, 0, 0];
    }
    else if (fn === OPS.setFillCMYKColor || fn === 5) {
      currentState.fill.colorSpace = ColorSpaceTypes.DEVICE_CMYK;
      currentState.fill.color = args ? args.slice(0, 4) : [0, 0, 0, 0];
    }
    
    // Line width
    else if (fn === OPS.setLineWidth || fn === 22) {
      currentState.lineWidth = args ? args[0] : 1;
    }
    
    // Line cap
    else if (fn === OPS.setLineCap || fn === 23) {
      const caps = ['butt', 'round', 'square'];
      currentState.lineCap = caps[args?.[0]] || 'butt';
    }
    
    // Line join
    else if (fn === OPS.setLineJoin || fn === 24) {
      const joins = ['miter', 'round', 'bevel'];
      currentState.lineJoin = joins[args?.[0]] || 'miter';
    }
    
    // Miter limit
    else if (fn === OPS.setMiterLimit || fn === 25) {
      currentState.miterLimit = args?.[0] || 10;
    }
    
    // Dash
    else if (fn === OPS.setDash || fn === 26) {
      currentState.dash = args?.[0] || [];
      currentState.dashPhase = args?.[1] || 0;
    }
    
    // Clip
    else if (fn === OPS.clip || fn === 28 || fn === OPS.eoClip || fn === 29) {
      currentState.clip = {
        path: [...currentState.clipPath],
        rule: fn === OPS.eoClip || fn === 29 ? 'even-odd' : 'winding',
      };
    }
    
    // Transparency
    else if (fn === OPS.setFillAlpha || fn === 44) {
      currentState.fillOpacity = args?.[0] ?? 1;
    }
    else if (fn === OPS.setStrokeAlpha || fn === 45) {
      currentState.strokeOpacity = args?.[0] ?? 1;
    }
    else if (fn === OPS.setGState || fn === 57) {
      // Graphics state dictionary - would need to resolve reference
    }
    
    // Blend mode
    else if (fn === OPS.setBlendMode || fn === 58) {
      currentState.blendMode = parseBlendMode(args?.[0]);
    }
    
    // Rendering intent
    else if (fn === OPS.setRenderingIntent || fn === 59) {
      currentState.renderingIntent = args?.[0] || 'RelativeColorimetric';
    }
    
    // Overprint
    else if (fn === OPS.setOverprint || fn === 60) {
      currentState.overprint = args?.[0] ?? false;
    }
    
    // Save state snapshot
    states.push({
      index: i,
      state: pushGraphicsState(currentState),
    });
  }
  
  return states;
}

/**
 * Build graphics state summary from extracted states.
 */
export function buildGraphicsStateSummary(states) {
  const transforms = states.map(s => s.state.transform);
  const uniqueTransforms = [...new Set(transforms.map(t => JSON.stringify(t)))].map(t => JSON.parse(t));
  
  const strokeColors = states
    .filter(s => s.state.stroke.color)
    .map(s => ({
      colorSpace: s.state.stroke.colorSpace,
      color: s.state.stroke.color,
      rgb: toRgb(s.state.stroke.color, s.state.stroke.colorSpace),
    }));
  
  const fillColors = states
    .filter(s => s.state.fill.color)
    .map(s => ({
      colorSpace: s.state.fill.colorSpace,
      color: s.state.fill.color,
      rgb: toRgb(s.state.fill.color, s.state.fill.colorSpace),
    }));
  
  const hasTransparency = states.some(s => 
    s.state.opacity < 1 || 
    s.state.fillOpacity < 1 || 
    s.state.strokeOpacity < 1 ||
    s.state.blendMode !== 'Normal'
  );
  
  const hasClipping = states.some(s => s.state.clip !== null);
  
  const hasPatterns = states.some(s => 
    s.state.fill.colorSpace === ColorSpaceTypes.PATTERN ||
    s.state.stroke.colorSpace === ColorSpaceTypes.PATTERN
  );
  
  return {
    uniqueTransforms: uniqueTransforms.length,
    strokeColors: [...new Set(strokeColors.map(c => JSON.stringify(c)))].map(c => JSON.parse(c)),
    fillColors: [...new Set(fillColors.map(c => JSON.stringify(c)))].map(c => JSON.parse(c)),
    hasTransparency,
    hasClipping,
    hasPatterns,
    lineStyles: [...new Set(states.map(s => `${s.state.lineCap}-${s.state.lineJoin}-${s.state.lineWidth}`))],
  };
}
