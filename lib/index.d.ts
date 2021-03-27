interface Arc {
    GetEnabled(): boolean;
    SetEnabled(enabled: boolean): void;
    GetCFrame(): CFrame;
    SetCFrame(cframe: CFrame): void;
    GetRange(): LuaTuple<[Vector3, Vector3]>;
    SetRange(source: Vector3, drain: Vector3): void;
    GetColor(): Color3;
    SetColor(color: Color3): void;
    GetTopColor(): Color3;
    SetTopColor(color: Color3): void;
    GetNumArcs(): number;
    GetFatnessMultiplier(): number;
    SetFatnessMultiplier(fatnessMultiplier: number): void;
    Destroy(): void;
}

interface ArcConstructor {
  new (
    source?: Vector3,
    drain?: Vector3,
    color?: Color3,
    topColor?: Color3,
    numArcs?: number,
    fatnessMultiplier?: number,
    enabled?: boolean
  ): Arc;
  readonly link: (
      source: Attachment,
      drain: Attachment,
      color?: Color3,
      topColor?: Color3,
      fatnessMultiplier?: number,
      enabled?: boolean
  ) => Arc;
}

declare const Arc: ArcConstructor;
export = Arc;
