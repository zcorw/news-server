import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { NewsService } from './news.service';
import { TextDto } from './dto';
import { SkipAuth } from 'src/common/decorators/SkipAuthDecorator';
import { ResultData } from 'src/common/result';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Post('/parser')
  @HttpCode(200)
  @SkipAuth()
  parser(@Body() data: TextDto) {
    return ResultData.ok(
      {
        text: this.newsService.createMarkdown(data.text),
      },
      '转换成功',
    );
  }
}
