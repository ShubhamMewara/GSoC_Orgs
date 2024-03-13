import puppeteer from "puppeteer";

export async function scrapetechnologies(link:string){
    const browser = await puppeteer.launch({headless:false});
    try{
        const page = await browser.newPage();
        await page.goto(link, { timeout: 2 * 60 * 1000 });
        await page.waitForSelector('.tech__content');
        let data = await page.evaluate(()=>{
            let webLink = (document.querySelector('.link__wrapper a') as HTMLAnchorElement)?.href;
            let techs = document.querySelector('.tech__content')?.textContent?.split(',').map((a:string) => a.trim());
            let topics = document.querySelector('.topics__content')?.textContent?.split(',').map((a:string) => a.trim());
            let  IdeasList  = (document.querySelector('.button-wrapper div a') as HTMLAnchorElement)?.href?.trim();
            let ContributorGuidance = (document.querySelector('section div .link-wrapper.ng-star-inserted  a') as HTMLAnchorElement)?.href?.trim();
            let links = Array.from(document.querySelectorAll('.content ul .ng-star-inserted a'));
            let link = links.map((a:Element) => {
                var textContent = a.textContent?.trim().replace(/\s+/g, ' ');
                let link = a.getAttribute('href')
                return { textContent, link };
            })
            return {techs, topics, webLink, link , ContributorGuidance , IdeasList};
        })
        return data;

    }catch(e){
        return {data:"Error Occurred! " + e};
    } finally {
        await browser.close();
   }
}