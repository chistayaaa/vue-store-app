
export default function gotoPage(pageName, pageParams) {
    this.currentPage = pageName;
    this.currentPageParams = pageParams || {};
};
