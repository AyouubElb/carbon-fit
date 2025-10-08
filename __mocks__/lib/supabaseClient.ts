export const supabase = {
  from: jest.fn(() => ({
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({ error: null }),
  })),
};

export const SUPABASE_IMAGE_URL =
  "https://bnamvffvziulrvptnjax.supabase.co/storage/v1/object/public/";
