import booksSeed from "@/data/books.json";
import usersSeed from "@/data/users.json";
import categoriesSeed from "@/data/categories.json";

// In-memory store. Resets on server restart, which is the expected behaviour
// for a simulated API in this academic activity.
const store = {
  books: structuredClone(booksSeed),
  users: structuredClone(usersSeed),
  categories: structuredClone(categoriesSeed),
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
