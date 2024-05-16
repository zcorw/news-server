import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  createMarkdown(text: string): string {
    const myRg = /•\s+([^：]+)：([^\n]+)\n*/g;
    let md = '\n';
    let oneNews: RegExpExecArray = null;
    while ((oneNews = myRg.exec(text))) {
      md += '### ' + oneNews[1] + '\n' + oneNews[2] + '\n\n';
    }
    return md;
  }
}
