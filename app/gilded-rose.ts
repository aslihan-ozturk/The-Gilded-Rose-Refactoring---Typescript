export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const SULFURAS : string = 'Sulfuras, Hand of Ragnaros';
export const BACKSTAGE : string = 'Backstage passes to a TAFKAL80ETC concert';
export const CONJURED : string = 'Conjured';
export const BRIE : string = 'Aged Brie';
export const nonStandartItemList : string[] = [SULFURAS, BACKSTAGE, CONJURED, BRIE];
export const maxQuality: number = 50;
export const minQuality: number = 0;

export interface SpecialItem{
 item: Item;
 updateSellin: () => void;
 updateQuality: () => void;
}

export class StandardItem implements SpecialItem{
  item: Item;
  constructor(item: Item) {
    this.item = item;
  }
  updateSellin(){
    this.item.sellIn = this.item.sellIn - 1;
  }
  updateQuality(){
    const decConst = this.item.sellIn<0 ? 2 : 1;

    for(let k=0; k<decConst; k++){
      if(this.item.quality>minQuality){
        this.item.quality = this.item.quality - 1;
      }
    }
  }
}

export class Sulfuras implements SpecialItem{
  item: Item;
  constructor(item: Item) {
    this.item = item;
  }

  updateQuality(): void {
    // quality remains 80, do nothing;
  }

  updateSellin(): void {
    // sellin remains same, do nothing;
  }

}

export class AgedBrie implements SpecialItem{
  item: Item;
  constructor(item: Item) {
    this.item = item;
  }

  updateQuality(): void {
    if(this.item.quality<maxQuality){
      this.item.quality = this.item.quality + 1;
    }
  }

  updateSellin(): void {
    this.item.sellIn = this.item.sellIn - 1;
  }

}

export class Backstage implements SpecialItem{
  item: Item;
  constructor(item: Item) {
    this.item = item;
  }

  updateQuality(): void {
    if(this.item.sellIn === 0){
      this.item.quality = minQuality;
    }else{
      const incrementAmount = this.getBackStageIncrement()
      for(let k=0; k<incrementAmount; k++){
        if(this.item.quality<maxQuality){
          this.item.quality = this.item.quality + 1;
        }
      }
    }
  }

  getBackStageIncrement(){
    const sellIn : number = this.item.sellIn;
    if(sellIn>10){
      return 1;
    }else if(sellIn<11 && sellIn>6){
      return 2;
    }else{
      return 3;
    }
  }

  updateSellin(): void {
    this.item.sellIn = this.item.sellIn - 1;
  }

}

export class ConjuredItem implements SpecialItem{
  item: Item;
  decConst: number;
  constructor(item: Item) {
    this.item = item;
    this.decConst = 2;
  }

  updateQuality(): void {
    for(let k=0; k<this.decConst; k++){
      if(this.item.quality>minQuality){
        this.item.quality = this.item.quality - 1;
      }
    }
  }

  updateSellin(): void {
    this.item.sellIn = this.item.sellIn - 1;
  }

}

export class ItemBuilder{
  itemTypes: Map<String, SpecialItem>;

  constructor(item){
    this.itemTypes = new Map<String, SpecialItem>();
    this.itemTypes.set(SULFURAS, new Sulfuras(item));
    this.itemTypes.set(BRIE, new AgedBrie(item));
    this.itemTypes.set(BACKSTAGE, new Backstage(item));
    this.itemTypes.set(CONJURED, new ConjuredItem(item));
  }

  getCustomisedItem(item: Item) : SpecialItem | undefined{
    if(nonStandartItemList.includes(item.name)){
      return this.itemTypes.get(item.name);
    }else return new StandardItem(item);
  }

}

 export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const itemBuilder : ItemBuilder = new ItemBuilder(this.items[i]);
      const customisedItem: SpecialItem | undefined = itemBuilder.getCustomisedItem(this.items[i]);
      if(customisedItem !== undefined){
        customisedItem.updateSellin();
        customisedItem.updateQuality();
      }else console.log("UNDEFINED!!!")

    }
    return this.items;
  }
}
