describe("ChessboardModel", function() {
  var model, collection;

  beforeEach(function() {
    model = new ChessboardModel({n:8});
  });

  it("should find non conflicts", function() {
    model.setSimpleBoard([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]);
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(false);
    expect(model.hasQueensConflict()).toBe(false);
  });

  it("should find row conflicts", function() {
    model.setSimpleBoard([
      [false, false, false, false],
      [true, true,  false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]);
    expect(model.hasAnyRowConflict()).toBe(true);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(true);
    expect(model.hasQueensConflict()).toBe(true);
  });

  it("should find column conflicts", function() {
    model.setSimpleBoard([
      [true,  false, false, false],
      [false, false, false, false],
      [true,  false, false, false],
      [false, false, false, false]
    ]);
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(true);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(true);
    expect(model.hasQueensConflict()).toBe(true);
  });

  it("should find backward-slash-style conflicts", function() {
    model.setSimpleBoard([
      [false, true,  false, false],
      [false, false, true,  false],
      [false, false, false, false],
      [false, false, false, false]
    ].reverse());
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(true);
    expect(model.hasAnyUpRightConflict()).toBe(false);
    expect(model.hasRooksConflict()).toBe(false);
    expect(model.hasQueensConflict()).toBe(true);
  });

  it("should find forward-slash-style conflicts", function() {
    model.setSimpleBoard([
      [false, false, true,  false],
      [false, false, false, false],
      [true,  false, false, false],
      [false, false, false, false]
    ].reverse());
    expect(model.hasAnyRowConflict()).toBe(false);
    expect(model.hasAnyColConflict()).toBe(false);
    expect(model.hasAnyUpLeftConflict()).toBe(false);
    expect(model.hasAnyUpRightConflict()).toBe(true);
    expect(model.hasRooksConflict()).toBe(false);
    expect(model.hasQueensConflict()).toBe(true);
  });

  describe("specific row", function() {
    it("finds row conflicts", function() {
      model.setSimpleBoard([
        [true,  false, true, false],
        [false, false, false, false],
        [true,  true, false, false],
        [false, false, false, true]
      ]);
      expect(model.hasRowConflictAt(0)).toBe(true);
      expect(model.hasRowConflictAt(1)).toBe(false);
      expect(model.hasRowConflictAt(2)).toBe(true);
      expect(model.hasRowConflictAt(3)).toBe(false);
    });

    it("finds column conflicts", function() {
      model.setSimpleBoard([
        [true, false, true, false],
        [true, false, false, true],
        [false, false, false, false],
        [false, true, true, false]
      ]);
      expect(model.hasColConflictAt(0)).toBe(true);
      expect(model.hasColConflictAt(1)).toBe(false);
      expect(model.hasColConflictAt(2)).toBe(true);
      expect(model.hasColConflictAt(3)).toBe(false);
    });
  });

  describe("specific index", function() {
    it("finds up-left conflicts", function() {
      model.setSimpleBoard([
        [false, true,  false, false],
        [false, false, true,  false],
        [false, false, false, false],
        [false, false, false, false]
      ].reverse());

      // All indices are inreversed [(n - x),(n - y)]
      expect(model.hasUpLeftConflictAt(3,3)).toBe(false);
      expect(model.hasUpLeftConflictAt(3,2)).toBe(true);
      expect(model.hasUpLeftConflictAt(3,1)).toBe(false);
      expect(model.hasUpLeftConflictAt(2,1)).toBe(true);
      expect(model.hasAnyUpLeftConflict()).toBe(true);
    });

    it("finds up-right conflicts", function() {
      model.setSimpleBoard([
        [false, false, true,  false],
        [false, false, false, false],
        [true,  false, false, false],
        [false, false, false, false]
      ].reverse());

      // All indices are inreversed [(n - x),(n - y)]
      expect(model.hasUpRightConflictAt(3,3)).toBe(false);
      expect(model.hasUpRightConflictAt(3,2)).toBe(false);
      expect(model.hasUpRightConflictAt(3,1)).toBe(true);
      expect(model.hasAnyUpRightConflict()).toBe(true);
    });
  });
});
