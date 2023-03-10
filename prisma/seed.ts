import { PrismaClient, Post } from '@prisma/client';
const prisma = new PrismaClient();

const posts: Post[] = [
  {
    id: '1',
    contentPath: '/storage/posts/articles/1.md',
    emoji: '✅',
    title: 'post-1',
    publishDate: new Date('2023-03-01'),
    published: true,
    like: 0,
    createdAt: new Date('2023-03-01T04:34:22+09:00'),
    updatedAt: new Date('2022-03-01T04:34:22+09:00'),
  },
  {
    id: '2',
    contentPath: '/storage/posts/articles/2.md',
    emoji: '🎛',
    title: 'post-2',
    publishDate: new Date('2023-03-01'),
    published: true,
    like: 0,
    createdAt: new Date('2023-03-01T04:34:22+09:00'),
    updatedAt: new Date('2022-03-01T04:34:22+09:00'),
  },
  {
    id: '3',
    contentPath: '/storage/posts/articles/3.md',
    emoji: '💕',
    title: 'post-3',
    publishDate: new Date('2023-03-01'),
    published: true,
    like: 0,
    createdAt: new Date('2023-03-01T04:34:22+09:00'),
    updatedAt: new Date('2022-03-01T04:34:22+09:00'),
  },
  {
    id: '4',
    contentPath: '/storage/posts/articles/4.md',
    emoji: '🌎',
    title: 'post-4',
    publishDate: new Date('2023-03-01'),
    published: true,
    like: 0,
    createdAt: new Date('2023-03-01T04:34:22+09:00'),
    updatedAt: new Date('2022-03-01T04:34:22+09:00'),
  },
];

const doSeed = async () => {
  const transaction = [];
  for (const post of posts) {
    const createPost = prisma.post.create({
      data: post,
    });
    transaction.push(createPost);
  }
  return await prisma.$transaction(transaction);
};

const main = async () => {
  console.log(`Start seeding ...`);
  await doSeed();
  console.log(`Seeding finished`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
