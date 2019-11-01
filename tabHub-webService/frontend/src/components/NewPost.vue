<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-8">
        <searchForm></searchForm>
      </div>
      <div class="col-4">
        <user></user>
      </div>
    </div>
    
    <div class="row">
      <form class="col-12">
        <div class="form-group">
          <label for="tabGroupTitle">Title</label>
          <input type="text" class="form-control" id="tabGroupTitle" placeholder="Enter Title">
        </div>
        <div class="form-group">
          <textarea class="form-control" id="tabGroupContent" rows="8" placeholder="Enter Content"></textarea>
        </div>

        <div class="tabs container">
          <draggable handle=".handle">
            <div class="tab row">
              <div class="container">
                <div class="row">
                  <span class="col-1">1</span>
                  <button class="offset-9 col-1 handle">=</button>
                  <button class="col-1">x</button>
                </div>
                <div class="row">
                  <span class="col-5">title</span>
                  <span class="offset-1 col-6">url</span>
                </div>
                <div class="row">
                  <input type="text" class="form-control col-5" id="tabTitle">
                  <input type="text" class="form-control offset-1 col-6" id="tabUrl">  
                </div>
              </div>
            </div>
            <br>

            <div class="tab row">
              <div class="container">
                <div class="row">
                  <span class="col-1">2</span>
                  <button class="offset-9 col-1 handle">=</button>
                  <button class="col-1">x</button>
                </div>
                <div class="row">
                  <span class="col-5">title</span>
                  <span class="offset-1 col-6">url</span>
                </div>
                <div class="row">
                  <input type="text" class="form-control col-5" id="tabTitle">
                  <input type="text" class="form-control offset-1 col-6" id="tabUrl">  
                </div>
              </div>
            </div>
          </draggable>
          
          <div class="tab row text-center">
            <div class="col-12">
              <br>
              <a>+ add tab</a>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'NewPost',
  components:{
			draggable
	},
}
</script>