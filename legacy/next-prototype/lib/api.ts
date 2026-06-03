import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, meta?: Record<string, unknown>) {
  return NextResponse.json({
    success: true,
    data,
    error: null,
    meta,
  });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error: message,
    },
    { status },
  );
}
