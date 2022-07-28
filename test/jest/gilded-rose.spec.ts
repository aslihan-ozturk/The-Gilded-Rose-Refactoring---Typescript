import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});


describe('Gilded Rose1', () => {

  //The Quality of an item is never negative
  it('1', () => {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 5, 0),
      new Item('Conjured', 5, 0),
      new Item('foo', 5, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(0);

  });

//Once the sell by date has passed, Quality degrades twice as fast
  it('2', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  //"Aged Brie" actually increases in Quality the older it gets
  it('3', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  //The Quality of an item is never more than 50
  it('4', () => {
    const gildedRose = new GildedRose([
      new Item('Aged Brie', 0, 50),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(80);
    expect(items[2].quality).toBe(50);
  });
  //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  it('5', () => {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 15, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(15);

  });

  //"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // 	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  // 	Quality drops to 0 after the concert

  it('6', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
    expect(items[0].sellIn).toBe(14);
    expect(items[1].quality).toBe(22);
    expect(items[1].sellIn).toBe(9);
    expect(items[2].quality).toBe(23);
    expect(items[2].sellIn).toBe(4);
    expect(items[3].quality).toBe(0);
    expect(items[3].sellIn).toBe(0);

  });
//- "Conjured" items degrade in Quality twice as fast as normal items
  it('7', () => {
    const gildedRose = new GildedRose([
      new Item('Conjured', 15, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(14);
  });


});
