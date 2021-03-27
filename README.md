# Electric Arcs

This is the TypeScript port of buildthomas' [ElectricArc](https://github.com/buildthomas/ElectricArc).

----

This is an implementation of an electric arc effect for Roblox games.

Courtesy of user @AllYourBlox for the original implementation of the algorithm that produces the line segments for the arcs ([click here](https://devforum.roblox.com/t/electric-arc-demo-with-rbxls/35433)). The original code has been modularized and optimized for ease of use and more widely applicable use.

The original code manipulated many neon parts every frame which was not optimal due to the work it takes for the engine to update the position and size of baseparts. This version draws the line segments that represent the arcs through ImageHandleAdornments with the texture of a glowing line segment. Please note that this is still somewhat on the performance-heavy side and may be an overkill kind of implementation for such an electricity effect, but the library does include auto-throttling and other tricks to make sure the frame rate stays as high as possible and no effort is wasted updating effects that are far away compared to those closeby.

# Showcase

See here for a visual example:

https://gfycat.com/ConcernedPersonalHammerkop

## Downloads

A model file and example place can be downloaded through the following Developer Forum thread (if you would prefer not to work from source):

https://devforum.roblox.com/t/release-electric-arcs-effect/228413

# Usage

The following listing shows how some of the most important API is used to make the effects happen in a game.

```ts
import Arc from "@rbxts/eletric-arc";

// Make an arc between two static points with default colors:
const arc1 = new Arc(
    new Vector3(10, 10, 0),
    new Vector3.new(-10, 10, 0)
);

// Make a dynamic arc linked between two (moving) attachments:
const arc2 = Arc.link(
    workspace.ArcStart.Attachment,
    workspace.ArcEnd.Attachment
);

// Make an arc that is green:
const arc3 = new Arc(
    new Vector3(10, 10, 0),
    new Vector3(-10, 10, 0),
    new Color3(0, 1, 0)
);

// Make a blue one with 12 arcs (instead of default 6) with segments that are half as wide as normal:
const arc4 = new Arc(
    new Vector3(10, 10, 0),
    new Vector3(-10, 10, 0),
    new Color3(.5, .5, 1)       // cyan
    new Color3(1, 1, 1),        // top color (not important here)
    12,                         // number of arcs
    0.5                         // fatness multiplier (half of normal)
);

// Change various properties while it is running:
arc1.SetColor(new Color3(1, 0, 0)); // make it red
arc1.SetRange(new Vector3(20, 10, 0), new Vector3(-20, 10, 0)); // update points
arc2.SetEnabled(false); // toggle off temporarily
arc3.SetCFrame(arc3.GetCFrame().add(new Vector3(0, 5, 0))); // move up by 5 studs
arc4.SetFatnessMultiplier(2); // twice as fat as default now

// Cleanup arcs:
arc1.Destroy();
arc2.Destroy();
arc3.Destroy();
arc4.Destroy();
```

# API Listing

This section lists the entire API that is available through this library.

## Constructors

These methods will return an Arc object that can be manipulated further with the rest of the API.

```ts
new Arc(
    source?: Vector3,                      // start
    drain?: Vector3,                       // end
    basisColor?: Color3,                   // darkest color
    topColor?: Color3,                     // brightest color
    numArcs?: number,                      // amount of separate arcs at once
    fatnessMultiplier?: number,            // make the segments of this arc thinner/thicker
    enabled?: boolean,                     // start out enabled?
)
```

```ts
Arc.link(
    source: Attachment,            // static or moving attachment for start
    sink: Attachment,              // static or moving attachment for end
    basisColor?: Color3,
    topColor?: Color3,
    numArcs?: number,
    fatnessMultiplier?: number,
    enabled?: boolean,
)
```

## Updating properties of Arc objects

```ts
ArcObject.GetEnabled(): boolean
// Whether effect is visible.
```

```ts
ArcObject.SetEnabled(
    enabled: boolean
)

// Set visibility of the effect.
```

```ts
ArcObject.GetCFrame(): CFrame

// Get orientation of source (= start) of the effect.
```

```ts
ArcObject.SetCFrame(
    cframe: CFrame
)

// Set orientation of source (= start) of an effect created through Arc.new (not Arc.link).
```

```ts
ArcObject.GetRange(): LuaTuple<[Vector3, Vector3]>

// Returns the two current points that the effect is between.
```

```ts
ArcObject.SetRange(
    source: Vector3,
    drain: Vector3
)

// Updates an effect created through Arc.new (not Arc.link) to be between the two given points.
```

```ts
ArcObject.GetColor(): Color3
```

```ts
ArcObject.SetColor(
    color: Color3
)
```

```ts
ArcObject.GetTopColor(): Color3
```

```ts
ArcObject.SetTopColor(
    topColor: Color3
)
```

```ts
ArcObject.GetNumberOfArcs(): number
```

```ts
ArcObject.GetFatnessMultiplier(): number
```

```ts
ArcObject.SetFatnessMultiplier(
    topColor: number
)
```

## Destructor

```ts
ArcObject.Destroy()

// Will stop and clean up the effect.
```

# License

This library is freely available for use in your projects under the MIT license.

Credit to @AllYourBlox for open-sourcing the algorithm that produces the line segments for the arcs, which was edited and optimized for this implementation.