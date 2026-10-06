import { buildCmsUrls } from '../cms';

describe('buildCmsUrls', () => {
  it('uses the Strapi endpoints when a CMS url is set', () => {
    const urls = buildCmsUrls('http://192.168.1.10:1337/');
    expect(urls.foggles('RO')).toBe('http://192.168.1.10:1337/api/app/config/foggles/RO');
    expect(urls.toolsAssetsMapping('RO', 'ro')).toBe('http://192.168.1.10:1337/api/app/config/tools-assets/RO/ro');
    expect(urls.learn('AM', 'hy')).toBe('http://192.168.1.10:1337/api/app/content/AM/hy/learn');
    expect(urls.support('AM', 'hy')).toBe('http://192.168.1.10:1337/api/app/content/AM/hy/support');
  });

  it('fails when no CMS url is set', () => {
    expect(() => buildCmsUrls(undefined)).toThrow('EXPO_PUBLIC_CMS_URL');
    expect(() => buildCmsUrls('')).toThrow('EXPO_PUBLIC_CMS_URL');
  });
});
