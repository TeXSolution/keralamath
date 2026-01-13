import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    year: 2016,
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
  },
];

export default function BookList() {
  const [search, setSearch] = useState("");

  const filteredBooks = initialBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center"
      >
        📚 Book List
      </motion.h1>

      <Input
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md mx-auto"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-5 space-y-2">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Author: {book.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  Published: {book.year}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="text-center text-muted-foreground">
          No books found 📖
        </p>
      )}
    </div>
  );
}
