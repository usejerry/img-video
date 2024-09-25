
interface RecordNew extends Record<string, any> {
  default: string;
};

// 获取assets静态资源
const getAssetsFile = (url: string) => {

  const path = `../assets/${url}`;

  const modules = import.meta.glob("../assets/**/*.{png,jpg,gif,webp,bmp}", { eager: true });

  return (modules[path] as RecordNew)?.default;
}

// 格式化日期
const formatDate = (date: string | Date | undefined, fmt: string): string => {

  if (!date) return "";
  if (typeof date === 'string') date = new Date(date);

  const o: { [index: string]: any } = {
    "M+": date.getMonth() + 1, // 月份 
    "d+": date.getDate(), // 日 
    "h+": date.getHours(), // 小时 
    "m+": date.getMinutes(), // 分 
    "s+": date.getSeconds(), // 秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度 
    "S": date.getMilliseconds() // 毫秒 
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((o[k].toString()).length)));
    }
  });

  return fmt;
}

// 转义html字符
const encodedString = (htmlString: string) => {

  return htmlString.replace(/[<>&"]/g, (match) => {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\"":
        return "&quot;";
      default:
        return match;
    }
  });
}

export { getAssetsFile, formatDate, encodedString };
