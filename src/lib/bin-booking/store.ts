import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StoredBinBooking } from "./types";

/**
 * File-based booking store (.data/bin-bookings/*.json).
 * Swap this module for a database adapter later; callers depend only on these functions.
 */
const DATA_DIR = path.join(process.cwd(), ".data", "bin-bookings");

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

function filePath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

export async function saveBooking(booking: StoredBinBooking): Promise<void> {
  await ensureDir();
  await writeFile(filePath(booking.id), JSON.stringify(booking, null, 2), "utf8");
}

export async function getBooking(id: string): Promise<StoredBinBooking | null> {
  try {
    const raw = await readFile(filePath(id), "utf8");
    return JSON.parse(raw) as StoredBinBooking;
  } catch {
    return null;
  }
}

export async function listBookings(): Promise<StoredBinBooking[]> {
  await ensureDir();
  const names = await readdir(DATA_DIR);
  const out: StoredBinBooking[] = [];
  for (const name of names) {
    if (!name.endsWith(".json")) continue;
    const raw = await readFile(path.join(DATA_DIR, name), "utf8");
    out.push(JSON.parse(raw) as StoredBinBooking);
  }
  return out;
}

export async function updateBooking(
  id: string,
  patch: Partial<StoredBinBooking>,
): Promise<StoredBinBooking | null> {
  const existing = await getBooking(id);
  if (!existing) return null;
  const next = { ...existing, ...patch };
  await saveBooking(next);
  return next;
}