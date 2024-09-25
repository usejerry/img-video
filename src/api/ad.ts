import { ajaxClient } from '../utils/request'

export type ADResult = {
    code: string;
    msg: string;
    content: { [index: string]: Array<string> }
};

export function getad() {

    return ajaxClient.post<ADResult>('/fz/interface/frontend/fz.do', {
        pos: 'tongyong-dingtiao-8379,tongyong-piaochuang-9781,tongyong-lunhuan-670517'
    });
}