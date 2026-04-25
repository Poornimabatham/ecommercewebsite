const formatTransaction = (doc) => ({
  id: doc._id,
  title: doc.title,
  amount: doc.amount,
  type: doc.type,
  category: doc.category,
  date: doc.date,
  note: doc.note || '',
  createdAt: doc.createdAt,
});

module.exports = { formatTransaction };
