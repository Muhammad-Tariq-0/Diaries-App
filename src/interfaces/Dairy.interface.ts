export interface diary {
    diaryId: String,
    title: String,
    createdAt: String,
    updatedAt: String,
    userId: String,
    type: 'public' | 'private',
    entryId: String
}