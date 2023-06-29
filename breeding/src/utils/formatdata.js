export default function formatdata(itemdate){

    // 当前日期
    const currentDate = new Date();

    // 获取当前日期的年、月、日
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // 格式化当前日期为 "YYYY-MM-DD" 格式
    const formattedCurrentDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;

    // 日期列表并显示结果
    const date = new Date(itemdate);

    // 获取日期的年、月、日
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // 格式化日期为 "YYYY-MM-DD" 格式
    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    if (formattedDate === formattedCurrentDate) {
        return '今天';
    } else if (formattedDate === getNextDay(formattedCurrentDate)) {
        return '明天';
    } else if (formattedDate === getNextDay(getNextDay(formattedCurrentDate))) {
        return '后天';
    } else {
        const dayOfWeek = getDayOfWeek(date.getDay());
        return dayOfWeek ;
    }


    // 获取下一天的日期
    function getNextDay(dateString) {
        const nextDay = new Date(dateString);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1).toString().padStart(2, '0') + '-' + nextDay.getDate().toString().padStart(2, '0');
    }

    // 获取星期几的文本表示
    function getDayOfWeek(dayIndex) {
        const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return daysOfWeek[dayIndex];
    }

}