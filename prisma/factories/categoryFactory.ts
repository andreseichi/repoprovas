export default function categoryFactory(category: string) {
  return {
    where: { name: category },
    update: {},
    create: {
      name: category,
    },
  };
}
