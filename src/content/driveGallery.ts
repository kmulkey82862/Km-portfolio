// Creative and social media work, hosted with the site in public/media/gallery/.
// Each item's id names its files (the ids came from the original Google Drive uploads).
// To add a piece: put the source file, named by a new id, in a folder, run
// `node scripts/gallery-media.mjs <folder>`, then add the id to the right group below.

export type DriveItem = { id: string; title: string; kind: 'image' | 'video' };
export type DriveGroup = {
  id: string;
  client: string;
  title: string;
  note?: string;
  /** 'wide' shows whole images in landscape tiles (banners, web pages) instead of cropping to portrait. */
  shape?: 'wide';
  items: DriveItem[];
};

const img = (id: string, title: string): DriveItem => ({ id, title, kind: 'image' });
const vid = (id: string, title: string): DriveItem => ({ id, title, kind: 'video' });

const BASE = '/media/gallery/';
export const thumbSrc = (id: string) => `${BASE}${id}-600.webp`;
export const fullSrc = (id: string) => `${BASE}${id}-1800.webp`;
export const videoSrc = (id: string) => `${BASE}${id}.mp4`;

export const driveGroups: DriveGroup[] = [
  {
    id: 'comeaux-social',
    client: 'Comeaux Furniture',
    title: 'Social media',
    note: 'Posts, stories, and promo videos, including the Gotta Geaux campaign.',
    items: [
      vid('1EBwaLbO8IByk9QsyqK7JJ7MCkVhxN_9d', 'Gotta Geaux promo, movie marquee'),
      vid('1O0YAmxblaQ7hn21tdwYIRjEV4SRlAFpJ', 'Carmela Collection promo'),
      vid('10_IpR054e42j_vVEV2sXxfcKWqmWLd3n', 'Bedroom set promo'),
      vid('1NUEHFm8_xypl20i6kuYMf7LCcaGw2BE8', 'Search bar promo'),
      vid('1LR6fSB2a7b7geSQrAAX7616J77FpA-BL', 'New collection, mobile video'),
      vid('1_2mMlT2D_x6iuPlMbpaJe8EacXvThX35', 'Gotta Geaux story'),
      vid('1pjMxp5XX2tAqdU3brBdV8cjI1z25zkS4', 'Gotta Geaux poll'),
      vid('10-8EfjICp3deg_GZBwJHrv-CQWENCT1Y', 'Mattress sale promo'),
      vid('1BCZNcFG1eQm6LFrrhOw8qpl9G53ErtsP', 'Comeaux Chic story'),
      img('1vYpcTd5msfRHUD2EB3TTsrH-jLmgRmj0', 'Story 1'),
      img('1xQnCfVxYtAlpy16QbVLmd2Gl7VNa-XBy', 'Story 2'),
      img('1PH_bR92QgHM_mml9EkbUS5Tnd8Kx5FQj', 'Story 3'),
      img('1a7VehMvbKOn2PaHLjWF2JVKH-ybvtSFq', 'Story 4'),
      img('1sj7XB0gxnfAwEWln3ZQDsdHmjoQ5hobC', 'Story 5'),
      img('1isAUKSboqf7mWBb8aCoqfzuopII19MVL', 'Post 1'),
      img('1MSG6tsJNg6EpbwGVAm8KNFD3BPeteSm5', 'Post 2'),
      img('1JaE1vj76hrdVhEKCJEsCoWYkbPDyOmFB', 'Post 3'),
      img('1WVQhxz0KdknoGneIzqbYe8WSjUMAtTvr', 'Post 4'),
      img('1fBhci9UqkEQPLJ9Panm8WWECaRHtLh1K', 'Post 5'),
      img('1DkNxI1b3XtmvPC1W0Mt94dp5L29jIruv', 'Home accent sale'),
      img('1o6HbEcenwvSt7nudbwJIn-PmD1XtK3ni', 'Home accent sale 2'),
      img('1930CQbmopiZ7Je2yDzsyfXA3eLQ1Q21g', 'BlueStar kitchen post'),
      img('1uSveC3xUyhH-Hgr7lGjuDhbBS-_tqm0H', 'Accessory sale post'),
      img('1A_VeWAy0bDRrRNc9ci5sJ5yvtQPeZrJb', 'Facebook cover'),
    ],
  },
  {
    id: 'comeaux-brand',
    client: 'Comeaux Furniture',
    title: 'Email & web banners',
    shape: 'wide',
    items: [
      img('1-I6J-qW_sKPe6HKhuq43z82JF1JTYHyP', 'Email banner, version 1'),
      img('1CLjaJyunmfmY3IYM7RKibK6hh7NzbLhL', 'Email banner, version 2'),
      img('18wMgiPkGSzYVrsAc3cfn0lhBmw-qpAOQ', 'Email banner, version 3'),
      img('1JZY5PNxU5aHazjoKv1o7QViXLAalsvF3', 'Email banner, version 5'),
      img('1wECHbvt8-pIq9kT6ozshukiAD0Lz0Oqh', 'Email banner, version 7'),
      img('14fM7Qo6WYgsrGk-PnS7-7OQUPWg_4SDf', 'Email footer'),
      img('1PF1d3eve-skm88eVTMuXBh1gOFp5CHg0', 'Product feature email graphic'),
      img('1hVH6vuywPuAWPiYEKjIn3aaOtYCRIlJt', 'Product feature email graphic 2'),
      img('1eqUvGCRpr9DxDtXG6Kk0lsngDvqbVU83', 'Home accents sale site banner'),
      img('1loMDaXxW_5eL4r_lU4MmKtIPHFIaQCmB', 'Home accents banner, alternate'),
    ],
  },
  {
    id: 'comeaux-infographics',
    client: 'Comeaux Furniture',
    title: 'Infographics',
    items: [
      img('12QTwz_SzQtQjUfuPO75NfIy9ETL6z2Di', 'Home decor tips infographic'),
      img('1ar-hWE4MppfDdfg2qYNTidLN_xRL3kTS', 'Infographic post'),
    ],
  },
  {
    id: 'comeaux-warranty',
    client: 'Comeaux Furniture',
    title: 'Warranty website',
    shape: 'wide',
    items: [
      img('12F5R3TwKHSed4kbEYYqX2Nm2dpIG-vCz', 'Furniture & appliance warranty page'),
      img('1fBOwuZRz0PXa-BWif2zZ0zy5xwSJBn_r', 'Furniture page'),
      img('1N8TVHnKOtJoIPXK2Yj4JkFEV-tTquD1q', 'Appliance page'),
      img('12HT3wyUa3Quc2hyrcMgxjF3yZyuVrOiM', 'Mattress page'),
      img('17xM9ggHfbD-mTBF4hAodJMYZVQpn8v1E', 'Out-of-warranty page'),
      img('1LqRZuETbynwuZmSDjqK13gnzAZU2tTRi', 'Page 5'),
    ],
  },
  {
    id: 'smo',
    client: 'Sewing Machine Outlet',
    title: 'Social media & email graphics',
    items: [
      vid('1IAh5JK5AF72xrwJUEsHR4LOFsgcOrW41', 'Mother’s Day gift card push'),
      vid('1FusXmCIsG0AgOZr2W4f8bez_6CCOHlg6', 'Black Friday story'),
      vid('1juE36MXefv5krv94aJ_fYf_rZwaluOjB', 'Kids Sewing Summer Camp story'),
      img('1utvn3e8ZcF_LpyVljZMpTlGvFz8oE1U-', 'Post 1'),
      img('1c1wyE-Zf_gJ1p5kB8t2QlPwBVDQjKQgo', 'Post 2'),
      img('1Kki1ylQHlKY79vnRTqLhmx5QZf_5s8F-', 'Post 4'),
      img('1Pswjhbafw1M2pNxO69T6bSmI1QIsNiFG', 'Post 5'),
      img('1-SNCATABZ9WAXw5JGRkUvyWcUUi5hb_V', 'Post 6'),
      img('1FFEGSGmTBq9Nm98aQxpkwzCiWv0w02yR', 'Post 8'),
      img('1DkNn97QxFnAaDaDvAI0atx36Me7M8J9f', 'Post 9'),
      img('1jOGjw7rtdQ7s6GiPkVfDvXqpDVeoKXVQ', 'Appreciated!'),
      img('1CW6YwTGc1CNZGAcYZNQR0QaDRptNxXZk', 'Janome post 2'),
      img('1hGyyKqWitcZYIVvo-m85BMX5o_sIIuYI', 'Janome post 3'),
      img('1LFYYZOeoTtXcRnU5WC1W-LJTjcAQvD6a', 'Janome story 1'),
      img('1jjq2rnF2ivtyKQjwe_MqTXPCVbwfo4wK', 'Janome story 2'),
      img('1cNItf61Lh8Fa3TJxAH-z8pqIw5Bi5CaE', 'Janome story 3'),
      img('18a34kJ3rvYbMF-vjZ8Gln5B0nzAPLtu2', 'Story 3'),
      img('1vEDHFgig8NqjUGsb1KLEb6s6-GOVLUox', 'Story 7'),
      img('1f5BdX0QZG-drkR5ZcQExAmK8kkKTQ1M1', 'MC500E LE feature'),
      img('1EfYRHwGiYDI1ePei6JySJBC499al61KQ', 'Summer email graphic'),
      img('1YFlnk2G3IVd_dem4uSGT4y2kksqwPauB', 'Mother’s Day fabric sale'),
      img('1Qh5UP8_AOQQglya69HYDCkulMmo55dzm', 'New product announcement'),
      img('1dLSySIik9P9n3JDWgQ2uIJKcs1Wg5OsM', 'Mother’s Day email header'),
      img('1zkVKnji_n4XbFOemmX-UW3LkxW7zTEPX', 'Email graphic'),
    ],
  },
  {
    id: 'hnoc',
    client: 'The Historic New Orleans Collection',
    title: 'Yet She Is Advancing',
    note: 'Exhibition promo video and design tests with different CTAs and styles.',
    items: [
      vid('1NxZhiIwdGs94-QgbjQahXXVZf3eSSv65', 'Video promo'),
      img('19sY384sbmrXUMGkLZ8fqQeQPngUr8sej', 'Design 1'),
      img('1cGW-29p_uy3Z8nD_2KmZozBE-gCk5sKy', 'Design 2'),
      img('120WYztYcOuz2oNioXQvh4J8O0M3xGw2X', 'Design 3'),
      img('1bmWVrO3fnKfZUvKqQWAhsENab3KZeCHb', 'Design 4'),
      img('1Vo0btrURXS-VfYfQxUk3RiEz418oj8M3', 'Design 5'),
      img('1Gw7uN80AeWSaUUlJtxqul7DaE_ffxlKj', 'Design 6'),
      img('10amDGin9tsInP6es66pClmiVKC5P30v_', 'Design 7'),
      img('1k_XBa_v8qmuPaTUS8Nm2DlXdT1kKA5Wp', 'Design 8'),
      img('1eN3w0LRG5J5f2ixrfRpVFnFfJyyyDYrz', 'Design 9'),
      img('11HwbSL9D9GOAShUk2wwDUfJC9D0RMz17', 'Design 10'),
      img('1V7nMBjc-bldjY6peDDCQXjrjHFEha0Ty', 'Design 11'),
      img('1RHazApQ5137TUUz9kyGf81KozmcDFZ61', 'Design 12'),
    ],
  },
  {
    id: 'music',
    client: 'New Orleans music',
    title: 'Music promo design',
    note: 'Social promos and AI-assisted visuals for local musicians.',
    items: [
      vid('1u16f_YUVrpT0-Uh-RPqtogcTQxkLJK0_', 'Gesso promo'),
      vid('1QcawLtkcFRWgfD7bC6rChQBb787c8H8_', 'Mr. Legwork logo, AI video'),
      img('19F6OlwVu2hVmVU9D3WW_NC-gqT5vB51U', 'Gesso album art (AI)'),
      img('1Ici1biOpuLfqr0QCJ7mslQvTLqpg9EgB', 'Busted on Bourbon Instagram promo'),
      img('1BAoNGoylILi9q3saK2eed_6TH-Kw0rWe', 'Promo design 1'),
      img('1nWSMobENaMZmphgTx3r5nOMdbOY5bR4z', 'Promo design 3'),
    ],
  },
  {
    id: 'cura',
    client: 'Cura OS',
    title: 'Brand identity',
    items: [
      img('1uksbxIa5l_bEaSnhq8QrCKbuLkxWlrvQ', 'Brand 1'),
      img('1wB3tv-ZooY-33BCKiHLgVN9ZU4xzH9vY', 'Brand 2'),
      img('1_d7oUfxorTuvKiPE7RqbSiDGIj1Ps4J_', 'Brand 3'),
      img('1jV22Sq51uao8dCiubcK6JTAXV5j4DKio', 'Brand 4'),
      img('1qRM192YpPA7WRisu2SRXkKJtcNqNzCKV', 'Brand 5'),
      img('1IaKjD9QgqlMLgW7XrAjEMDh-Ntr7ZzZN', 'Brand 6'),
      img('1Is_quHdiNMWopIADBrJfxB7cJdfO9EFt', 'Brand 7'),
      img('1ZVn0SYS1sICO9koOxP5BR4jiUDuEhdUO', 'Brand 8'),
      img('14EkNLIkM4x7E0Y3kT-OGemhreU04_5fe', 'Brand 9'),
      img('1YJaxJPa8d-ynAuoZxy9k410tdGCZavAK', 'Brand 10'),
      img('1SP4hTSjD2jJrOutsrWaZwpATw6-cyUO-', 'Brand 11'),
      img('1ssYnH9zQrwwdhfOeQ0oZqaP6V29VAXON', 'Brand 12'),
      img('11mdChn3c03rh7JM-jNGQrcXzJTgHz9YP', 'Brand 13'),
      img('1jdot-2lRWk6wewN6LDMapGHYjccey1Oa', 'Brand 14'),
      img('1HWx27lbWdiN016pX4q9yMhTxbJSYVcWy', 'Brand 15'),
    ],
  },
  {
    id: 'vermin-mother',
    client: 'Vermin Mother',
    title: 'Website design & content',
    shape: 'wide',
    items: [
      img('1CKaRDcLe6butpMuBXu8eFQQ4s1CR2yU7', 'Homepage'),
      img('1tlbJis_ms4ottIxTAOUN5Lp2S9vVe9pZ', 'Styled by page'),
      img('10WzVOtz1dIFjBf1g7uZUOimvosOC7ssl', 'Designs page'),
      img('1xu-RDdCnWz4ePr3vCWOHMN99i0-zAhBJ', 'Shop page'),
      img('1fijbnQ-AAcxbk08CaXm6MayfBN6l2g_g', 'Product page 1'),
      img('1bONkTLI1twC7v3DWtylbiYUgZrzMP-Uw', 'Product page 2'),
      img('17HP-u_HotJ0BWtZFTdCZLtuYK4jQ8aBz', 'Product page 3'),
      img('1LMjHWjHKl1UHkxDiFFzChFRvNKbgB_PU', 'Logo'),
    ],
  },
  {
    id: 'depostrike',
    client: 'Depostrike',
    title: 'AI logo montage',
    items: [vid('1w9QxxLw_vIuwT38bm85_eXMtE7IkFrs8', 'AI logo montage')],
  },
];
