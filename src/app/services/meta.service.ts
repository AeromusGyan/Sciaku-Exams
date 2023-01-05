import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaTag } from '../model/meta-tag';
import {} from '@nguniversal/express-engine/tokens';
import { Router } from '@angular/router';
export interface PageMetadata {
  title: string;
  // image will be added later
  description: string;
  author: string;
  keywords: string[];
  type: string;
}
const defaultMetadata: PageMetadata = {
  title: 'App Title',
  description: 'App description',
  author: 'Daniil Baunov',
  keywords: ['Angular', 'meta tags', 'Angular Universal'],
  type: 'website',
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private urlMeta: string = "og:url";
  private titleMeta: string = "og:title";
  private descriptionMeta: string = "og:description";
  private imageMeta: string = "og:image";
  private secureImageMeta: string = "og:image:secure_url";

  constructor(
    private _meta: Meta, 
    private metaTagService: Meta,
    private titleService: Title,
    // @Inject(HOST_URL) private hostUrl: string,
    private router: Router) { } 

  public setFacebookTags(url: string, title: string, description: string, image: string): void {
    var imageUrl = `https://sciaku.com/assets/images/courses/${image}`;
    var tags = [
      new MetaTag(this.urlMeta, url),
      new MetaTag(this.titleMeta, title),
      new MetaTag(this.descriptionMeta, description),
      new MetaTag(this.imageMeta, imageUrl),
      new MetaTag(this.secureImageMeta, imageUrl)
    ];
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach(siteTag => {
      this._meta.updateTag({ property: siteTag.name, content: siteTag.value });
    });
  }
}
