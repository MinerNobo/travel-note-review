export const travelNotesMock = {
  total: 10,
  page: 1,
  pageSize: 20,
  data: [
    {
      id: 'e0d730ff-509e-4d30-b99e-4f1488b6b646',
      title: '游记标题',
      content: '游记内容',
      status: 'PENDING',
      rejectReason: null,
      media: [
        {
          id: 'c8817c56-f57a-461e-a377-79a2683b325f',
          type: 'IMAGE',
          url: 'https://example.com/image.jpg',
          thumbnailUrl: 'https://example.com/thumbnail.jpg',
        },
      ],
      author: {
        id: 'c0cafbdb-fa9d-45fa-87f7-ab139dd455eb',
        username: '测试用户',
        avatarUrl: null,
      },
      createdAt: '2025-05-03T05:12:48.228Z',
      updatedAt: '2025-05-03T05:12:48.228Z',
    },
    {
      id: 'cfb25c70-2692-11f0-85ec-fa163eb50d7b',
      title: 'Exploring the Mountains',
      content: 'A beautiful journey through the mountains.',
      status: 'APPROVED',
      rejectReason: null,
      media: [
        {
          id: 'cfb5f6b0-2692-11f0-85ec-fa163eb50d7b',
          type: 'IMAGE',
          url: 'https://example.com/image1.jpg',
          thumbnailUrl: 'https://example.com/thumb1.jpg',
        },
      ],
      author: {
        id: 'cfaef6a7-2692-11f0-85ec-fa163eb50d7b',
        username: 'user1',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      createdAt: '2025-05-01T21:47:24.000Z',
      updatedAt: '2025-05-01T21:47:24.000Z',
    },
  ],
};
