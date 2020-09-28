import { getYear } from 'date-fns';
import fs from 'fs';
import imagemin from 'imagemin-overwrite';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';
import sharp from 'sharp';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Issue from '../infra/typeorm/entities/Issue';
import IIssuesRepository from '../repositories/IIssuesRepository';

interface IRequest {
 title?: string;
 description?: string;
 isSpecial: number;
 coverFilename: string;
 coverEncoding: string;
}

@injectable()
export default class CreateIssueService {
 constructor(
  @inject('IssuesRepository')
  private issuesRepository: IIssuesRepository,

  @inject('StorageProvider')
  private storageProvider: IStorageProvider,
 ) {}

 public async execute({ description, isSpecial, title, coverFilename, coverEncoding }: IRequest): Promise<Issue> {
  const { tmpFolder } = uploadConfig;

  const currentYear = getYear(Date.now());
  const volume = currentYear - 2013;

  let number: number | undefined;
  if (!!isSpecial === false) {
   const publishedIssues = await this.issuesRepository.findByYear(currentYear);
   number = publishedIssues.length + 1;
  }

  let defaultTitle = 'none';
  if (!title) {
   switch (number) {
    case 1:
     defaultTitle = 'Janeiro-Abril';
     break;
    case 2:
     defaultTitle = 'Maio-Agosto';
     break;
    case 3:
     defaultTitle = 'Setembro-Dezembro';
   }
  }

  let formattedName = coverFilename
   .replace(' ', '_')
   .normalize('NFKD')
   .replace(/[^\w-.]/g, '')
   .split('.')[0]
   .toLowerCase();

  if (coverEncoding !== 'image/png') {
   await sharp(path.resolve(tmpFolder, coverFilename))
    .png({
     adaptiveFiltering: true,
     compressionLevel: 0,
     progressive: true,
    })
    .toFile(path.resolve(tmpFolder, `${formattedName}-1.png`));

   await fs.promises.unlink(path.resolve(tmpFolder, coverFilename));
  }
  formattedName += '.png';

  await imagemin([`tmp/${formattedName}`], {
   plugins: [
    imageminPngquant({
     dithering: 1,
     quality: [0.7, 1],
     speed: 10,
     strip: true,
    }),
   ],
  });

  await this.storageProvider.saveFile(formattedName);

  const issue = await this.issuesRepository.create({
   title: title || defaultTitle,
   volume,
   number,
   description,
   isSpecial: !!isSpecial,
   cover: formattedName,
  });

  return issue;
 }
}
