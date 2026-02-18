import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const video = formData.get("video") as File;

    if (!video) {
      return NextResponse.json(
        { error: "No video provided" },
        { status: 400 }
      );
    }

    const strokeTypes = ["Freestyle", "Backstroke", "Breaststroke", "Butterfly"];
    const randomStroke = strokeTypes[Math.floor(Math.random() * strokeTypes.length)];
    
    const tempo = (40 + Math.random() * 30).toFixed(1);
    const speed = (1.2 + Math.random() * 1.5).toFixed(2);

    const tips = [
      "Keep your head steady and aligned with your spine",
      "Focus on a strong catch at the beginning of each stroke",
      "Maintain a consistent kick rhythm throughout",
      "Rotate your body with each stroke for better reach",
      "Exhale continuously underwater to avoid breath holding",
      "Streamline position off each wall for maximum distance",
      "High elbow recovery reduces drag and saves energy"
    ];

    const shuffled = tips.sort(() => 0.5 - Math.random());
    const selectedTips = shuffled.slice(0, 3);

    const analysis = {
      strokeType: randomStroke,
      tempo: `${tempo} strokes/min`,
      speed: `${speed} m/s`,
      tips: selectedTips,
      timestamp: new Date().toISOString(),
    };

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
