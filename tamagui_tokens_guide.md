# Tamagui Design Tokens Cheatsheet

## Understanding the Token System

Tamagui uses a **numerical scale system** where higher numbers create stronger visual hierarchy through contrast.

### Key Concept: Semantic vs Numbered Tokens

```javascript
// WITHOUT number = semantic token (use in code)
$background      // → main page/screen background
$color           // → primary text color
$borderColor     // → border colors

// WITH number = contrast steps (for layers and states)
$background2     // → card background (1 step darker)
$background3     // → input/button background (2 steps darker)
$background4     // → hover state (3 steps darker)
```

## Visual Layer Hierarchy

```
┌─────────────────────────────────────┐
│ $background (0) - page              │  ← lightest
│  ┌──────────────────────────────┐   │
│  │ $background2 - card          │   │  ← slightly darker
│  │  ┌────────────────────────┐  │   │
│  │  │ $background3 - button  │  │   │  ← even darker
│  │  └────────────────────────┘  │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

## Token Reference Table

### Background Tokens

| Token | Use Case | Example |
|-------|----------|---------|
| `$background` | Page/screen background | `<View bg="$background">` |
| `$background2` | Cards, panels on top of base | `<Card bg="$background2">` |
| `$background3` | Buttons, inputs, nested elements | `<Button bg="$background3">` |
| `$background4` | Hover/active states | `hoverStyle={{ bg: "$background4" }}` |
| `$backgroundHover` | Hover state alias (= background4) | Same as above |
| `$backgroundPress` | Press/active state | `pressStyle={{ bg: "$backgroundPress" }}` |
| `$backgroundFocus` | Focus state | `focusStyle={{ bg: "$backgroundFocus" }}` |

### Text Color Tokens (Inverse Logic)

| Token | Use Case | Example |
|-------|----------|---------|
| `$color` | Primary text (maximum contrast) | Headings, important text |
| `$color2` | Secondary text (slightly lighter) | Body text, descriptions |
| `$color3` | Tertiary text (lighter) | Hints, placeholders |
| `$color4` | Disabled state (minimum contrast) | Disabled text |

### Brand Colors (blue, red, green, etc.)

```javascript
// Scale from 1 to 12:
$blue1-$blue6    // → light shades (backgrounds, highlights)
$blue7-$blue9    // → medium shades (borders, hover)
$blue10-$blue12  // → dark shades (text, icons)

// Practical usage:
$blue4           // → light background for info blocks
$blue8           // → border for info blocks
$blue10          // → primary button background
$blue11          // → primary button hover
$blue12          // → text on light backgrounds
```

## Practical Examples

### Basic Layout with Cards

```jsx
<YStack bg="$background" padding="$4">
  {/* Primary heading - maximum contrast */}
  <Text color="$color" fontSize="$6" fontWeight="bold">
    Main Heading
  </Text>

  {/* Secondary text - less contrast */}
  <Text color="$color2" fontSize="$3">
    Secondary description text
  </Text>

  {/* Card - next visual layer */}
  <Card bg="$background2" padding="$3">
    <Text color="$color">Card content</Text>

    {/* Button - one layer deeper */}
    <Button
      bg="$background3"
      hoverStyle={{ bg: "$background4" }}
      pressStyle={{ bg: "$backgroundPress" }}
    >
      <Text color="$color">Click Me</Text>
    </Button>
  </Card>
</YStack>
```

### Primary Button with Brand Color

```jsx
<Button
  bg="$blue10"                    // base brand color
  color="white"                   // white text
  borderColor="$blue8"            // slightly lighter border
  hoverStyle={{
    bg: "$blue11"                 // 1 step darker on hover
  }}
  pressStyle={{
    bg: "$blue12"                 // even darker on press
  }}
>
  Primary Action
</Button>
```

### Info Alert Component

```jsx
<Card
  bg="$blue4"                     // light blue background
  borderColor="$blue8"            // medium blue border
  borderWidth={1}
  padding="$3"
>
  <Text color="$blue12">         {/* dark blue text */}
    Information message
  </Text>
</Card>
```

## Quick Decision Guide

### For Backgrounds:
- Base screen → `$background`
- Card/panel → `$background2`
- Input element → `$background3`
- Hover effect → `$background4` or `$backgroundHover`

### For Text:
- Headings, important text → `$color`
- Regular text → `$color` or `$color2`
- Secondary/gray text → `$color3`
- Disabled/placeholder → `$color4`

### For Brand Colors:
- Accent element background → `$blue10`
- Accent hover → `$blue11`
- Text on accent → `white` or `$blue1`
- Accent border → `$blue8`

## Why Use Semantic Tokens?

```jsx
// ❌ Bad - doesn't adapt to themes
<Card bg="white2" />

// ✅ Good - automatically inverts in dark mode
<Card bg="$background2" />
```

In light theme: `$background2` → `white2`
In dark theme: `$background2` → `black2`

## Golden Rule

Use **semantic tokens** (`$background`, `$color`) in 90% of cases.
Use **numbered tokens** (`$background3`, `$color2`) only when you need explicit visual hierarchy or states.

## Size & Spacing Tokens

### Size Scale
```javascript
$1: 20,    // small
$2: 28,    // medium-small
$3: 36,    // medium
$4: 44,    // medium-large (default)
$true: 44, // "true" size (default)
$5: 52,    // large
// ... up to $20
```

### Space Scale
```javascript
$0.5: 2,   // 2px
$1: 4,     // 4px
$2: 8,     // 8px
$3: 12,    // 12px
$4: 16,    // 16px (default)
$true: 16, // default spacing
// ... up to $20
```

### Border Radius
```javascript
$1: 3,     // subtle
$2: 5,     // small
$3: 7,     // medium
$4: 9,     // medium-large (default)
$true: 9,  // default radius
// ... up to $9
```

## Common Patterns

### Card Component
```jsx
<Card
  bg="$background2"
  padding="$4"
  borderRadius="$4"
  borderWidth={1}
  borderColor="$borderColor"
>
  <Text color="$color">Content</Text>
</Card>
```

### Input Field
```jsx
<Input
  bg="$background3"
  color="$color"
  placeholderTextColor="$color3"
  borderColor="$borderColor"
  focusStyle={{
    borderColor: "$blue8",
    bg: "$backgroundFocus"
  }}
/>
```

### Responsive Sizing
```jsx
<Button
  size={{
    xs: '$2',  // 28px on mobile
    md: '$4'   // 44px on tablet+
  }}
>
  Responsive Button
</Button>
```
