(function(){

  var ChessboardModel = Backbone.Model.extend({
    initialize: function(params){
      if (params.n) {
        this.clearPieces();
      } else {
        this.setSimpleBoard(params.board);
      }
    },

    clearPieces: function(){
      this.set('board', this.makeEmptyBoard());
    },

    setSimpleBoard: function(simpleBoard){
      this.set('board', this.makeBoardFromSimpleBoard(simpleBoard));
      this.set('n', this.get('board').length);
    },

    makeBoardFromSimpleBoard: function(simpleBoard){
      var that = this;
      return _.map(simpleBoard, function(cols, r){
        return _.map(cols, function(hasPiece, c){
          return {
            row: r,
            col: c,
            piece: hasPiece,
            sign: ((r+c)%2),
            inConflict: function(){
              // todo: how expensive is this inConflict() to compute?
              return (
                that.hasRowConflictAt(r) ||
                that.hasColConflictAt(c) ||
                that.hasUpLeftConflictAt(that._getUpLeftIndex(r, c)) ||
                that.hasUpRightConflictAt(that._getUpRightIndex(r, c))
              );
            }
          };
        }, this);
      }, this);
    },

    makeEmptyBoard: function(){
      var board = [];
      _.times(this.get('n'), function(){
        var row = [];
        _.times(this.get('n'), function(){
          row.push(false);
        }, this);
        board.push(row);
      }, this);
      return this.makeBoardFromSimpleBoard(board);
    },

    // we want to see the first row at the bottom, but html renders things from top down
    // So we provide a reversing function to visualize better
    reversedRows: function(){
      return _.extend([], this.get('board')).reverse();
    },

    togglePiece: function(r, c){
      this.get('board')[r][c].piece = !this.get('board')[r][c].piece;
      this.trigger('change');
    },

    _getUpLeftIndex: function(r, c){
      return r + c;
    },

    _getUpRightIndex: function(r, c){
      return this.get('n') - c + r - 1;
    },


    hasRooksConflict: function(){
      return this.hasAnyRowConflict() || this.hasAnyColConflict();
    },

    hasQueensConflict: function(){
      return this.hasRooksConflict() || this.hasAnyUpLeftConflict() || this.hasAnyUpRightConflict();
    },

    _isInBounds: function(r, c){
      return 0 <= r && r < this.get('n') && 0 <= c && c < this.get('n');
    },


    // todo: fill in all these functions - they'll help you!

    hasAnyRowConflict: function(){
      // todo
      var i, j,
          found = false,
          n = this.get('n'),
          board = this.get('board');

      // Check all rows to make sure all values in the row are false
      for(i = 0; i < n; i++) {
        found = false;
        for(j = 0; j < n; j++) {
          if(board[i][j].piece === true) {
            if(found) return true;
            found = true;
          }
        }
      }
      return false;
    },

    hasRowConflictAt: function(r){
      // todo
      return false;
    },

    hasAnyColConflict: function(){
      // todo
      var i, 
          j,
          found = false,
          n = this.get('n'),
          board = this.get('board');
      
      // Check all rows to make sure all values in the row are false
      for(i = 0; i < n; i++) {
        found = false;
        for(j = 0; j < n; j++) {
          if(board[j][i].piece === true) {
            if(found) return true;
            found = true;
          }
        }
      }

      return false;
    },

    hasColConflictAt: function(c){
      // todo
      return false;
    },

    hasAnyUpLeftConflict: function(){
      // todo
      var slice,
          z, x, y,
          found = false,
          n = this.get('n'),
          board = this.get('board');
      
      // Check all 'forward slash' rows for conflicts
      for(slice = 0; slice < n * 2 - 1; ++slice) {
        z = slice < n ? 0 : slice - n + 1;
        found = false;
        for(x = z; x <= slice - z; ++x) {
          y = slice - x;
          if(board[x][y].piece === true) {
            if(found) return true;
            found = true;
          }
        }
      }
      return false;
    },

    hasUpLeftConflictAt: function(upLeftIndex){
      // todo
      return false;
    },

    hasAnyUpRightConflict: function(){
      // todo
      var slice,
          z, x, y,
          found = false,
          n = this.get('n'),
          board = this.get('board');

      // Check all 'backward slash' rows for conflicts
      for(slice = 0; slice < n * 2 - 1; ++slice) {
        z = slice < n ? 0 : slice - n + 1;
        found = false;
        for(x = z; x <= slice - z; ++x) {
          y = (n - 1) - (slice - x);
          if(board[x][y].piece === true) {
            if(found) return true;
            found = true;
          }
        }
      }
      return false;
    },

    hasUpRightConflictAt: function(upRightIndex){
      // todo
      return false;
    }
  });

  this.ChessboardModel = ChessboardModel;

}());
