import { jsonpClient } from '../utils/request'

export type NewsListType = {
    title: string;
    url: string;
    showtime: string;
    imageFileId: string;
    imageUrl: string;
    imageUrls: string; // 新闻多个封面图url,使用";"分割
    redirectUrl: string; // 跳转新闻跳转url
    comment: string;
};

export function newslist() {

    return jsonpClient.get<NewsListType[]>('/news/outer/newslist.do', {
        contentkind: "846",// 分类ID，多个用逗号分隔
        limit: 5, // 获取条数
        start: 1, // 第几页数据，默认从1开始
        beginDate: '2016-9-1', // 开始时间，日期格式为'YYYY-MM-DD'
        endDate: '2016-9-2'
    });
}