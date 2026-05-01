import booksSeed from "@/data/books.json";
import usersSeed from "@/data/users.json";
import categoriesSeed from "@/data/categories.json";
import spacesSeed from "@/data/spaces.json";
import reservationsSeed from "@/data/reservations.json";

// In-memory store. Resets on server restart, which is the expected behaviour
// for a simulated API in this academic activity.
const store = {
  books: structuredClone(booksSeed),
  users: structuredClone(usersSeed),
  categories: structuredClone(categoriesSeed),
  spaces: structuredClone(spacesSeed),
  reservations: structuredClone(reservationsSeed),
};

export function listBooks({ category, year, type, q } = {}) {
  let result = store.books;
  if (category) result = result.filter((b) => b.category === category);
  if (year) result = result.filter((b) => b.year === Number(year));
  if (type) result = result.filter((b) => b.type === type);
  if (q) {
    const needle = q.toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(needle) ||
        b.author.toLowerCase().includes(needle),
    );
  }
  return result;
}

export function getTopBooks(limit = 10) {
  return [...store.books].sort((a, b) => b.sold - a.sold).slice(0, limit);
}

export function getBook(id) {
  return store.books.find((b) => b.id === id) ?? null;
}

export function listCategories() {
  return store.categories;
}

export function getUser(id) {
  return store.users.find((u) => u.id === id) ?? null;
}

export function listPurchasedBooks(userId) {
  const user = getUser(userId);
  if (!user) return [];
  return user.purchasedBookIds
    .map((id) => getBook(id))
    .filter((book) => book !== null);
}

export function purchase({ userId, bookIds }) {
  const user = store.users.find((u) => u.id === userId);
  if (!user) return { ok: false, error: "Usuario no encontrado" };

  const purchased = [];
  for (const id of bookIds) {
    const book = store.books.find((b) => b.id === id);
    if (!book) continue;
    if (book.stock <= 0) continue;
    book.stock -= 1;
    book.sold += 1;
    if (!user.purchasedBookIds.includes(id)) {
      user.purchasedBookIds.push(id);
    }
    purchased.push(book);
  }
  return { ok: true, purchased };
}

// === Coworking Functions ===

export function listSpaces() {
  return store.spaces.map((space) => ({
    ...space,
    reservations: store.reservations.filter((r) => r.spaceId === space.id),
  }));
}

export function getSpace(id) {
  const space = store.spaces.find((s) => s.id === id);
  if (!space) return null;
  return {
    ...space,
    reservations: store.reservations.filter((r) => r.spaceId === id),
  };
}

export function listReservationsByUser(userId) {
  return store.reservations.filter((r) => r.userId === userId);
}

export function createReservation({ spaceId, userId, userName, startTime, endTime }) {
  const space = store.spaces.find((s) => s.id === spaceId);
  if (!space) {
    return { ok: false, error: "Espacio no encontrado" };
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    return { ok: false, error: "La hora de fin debe ser posterior a la de inicio" };
  }

  // Check for overlapping reservations
  const overlapping = store.reservations.find((r) => {
    if (r.spaceId !== spaceId) return false;
    const rStart = new Date(r.startTime);
    const rEnd = new Date(r.endTime);
    return start < rEnd && end > rStart;
  });

  if (overlapping) {
    return { ok: false, error: "El espacio ya está reservado en ese horario" };
  }

  const reservation = {
    id: `r${Date.now()}`,
    spaceId,
    userId,
    userName,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  };

  store.reservations.push(reservation);
  return { ok: true, reservation };
}

export function getUserByEmail(email) {
  return store.users.find((u) => u.email === email) ?? null;
}
