const sharp = (): any => ({
 png: () => ({
  toFile: jest.fn(),
 }),
});

export default sharp;
