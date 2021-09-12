export default interface ICreateArticleDTO {
 authors: string[];
 file: string;
 title: string;
 section: 'article' | 'editorial' | 'essay' | 'interview' | 'review' | 'translation';
 sponsor?: string;
 reference_list: string;
}
