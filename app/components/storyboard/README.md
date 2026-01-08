# Storyboard Components

Scroll-driven animation components built with Framer Motion for creating interactive storyboards.

## Components

### `<Stage>`
Fixed viewport container that holds animated content. Content inside animates based on scroll position while the Stage remains fixed.

**Props:**
- `children: ReactNode` - Content to display
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Stage>
  <div className="size-160">
    <Polygon sides={3} />
  </div>
</Stage>
```

---

### `<Step>`
A scroll section that tracks its own scroll progress and provides it to children for animations.

**Props:**
- `children: (progress) => ReactNode` - Render function receiving scroll progress
- `height?: string` - CSS height value (default: "100vh")
- `className?: string` - Additional CSS classes

**Progress object:**
- `scrollYProgress: MotionValue<number>` - Scroll progress from 0 to 1

**Usage:**
```tsx
<Step height="200vh">
  {({ scrollYProgress }) => {
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
      <Stage>
        <motion.div style={{ rotate }}>
          <Polygon sides={4} />
        </motion.div>
      </Stage>
    );
  }}
</Step>
```

---

### `<SubStep>`
A nested animation step within a Step. Animates opacity based on a specific range of the parent Step's scroll progress.

**Props:**
- `children: ReactNode` - Content to display
- `scrollProgress: MotionValue<number>` - Parent Step's scrollYProgress
- `start?: number` - When to start fading in (0-1, default: 0)
- `end?: number` - When to start fading out (0-1, default: 1)
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<Step height="300vh">
  {({ scrollYProgress }) => (
    <Stage>
      <SubStep scrollProgress={scrollYProgress} start={0.2} end={0.5}>
        <h2>This appears from 20% to 50% of scroll</h2>
      </SubStep>

      <SubStep scrollProgress={scrollYProgress} start={0.5} end={0.8}>
        <h2>This appears from 50% to 80% of scroll</h2>
      </SubStep>
    </Stage>
  )}
</Step>
```

## Example

See `/app/storyboard-demo/page.tsx` for a complete working example.

## Architecture

```
┌─────────────────────────────────────┐
│ Stage (fixed viewport container)    │
│  ┌───────────────────────────────┐  │
│  │ Animated content positioned   │  │
│  │ based on scroll progress      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Step 1 (height: 200vh)              │
│ - Tracks scroll progress 0→1        │
│ - Animates content in Stage         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Step 2 (height: 300vh)              │
│ ├─ SubStep 1 (0.0 → 0.3)            │
│ ├─ SubStep 2 (0.3 → 0.6)            │
│ └─ SubStep 3 (0.6 → 1.0)            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Step 3 (height: 150vh)              │
└─────────────────────────────────────┘
```

## Tips

1. **Use `useTransform`** to map scroll progress to animation values
2. **Nest `<Stage>` inside `<Step>`** children to position content in viewport
3. **Adjust SubStep ranges** to control when content appears/disappears
4. **Vary Step heights** to control scroll speed for each section
5. **Combine multiple animations** using different transform ranges
