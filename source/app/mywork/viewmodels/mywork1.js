define(['durandal/app','knockout','plugins/router','plugins/dialog','mywork/mywork','mobiscrolljs'], function (app,ko,router,dialog,mywork,mobiscrolljs) {
   // Use the settings object to change the theme
  
       return  {
                activate:function () {
                       
                       
                        this.myrouter=mywork.getCurroute(this);
                        console.log(this.myrouter);

                        var navCls=$("#example-navbar-collapse").attr("class");
                          if (navCls=="navbar-collapse collapse in")
                                {
                                        $(".navbar-toggle").trigger("click");
                                }
                         
                },
                attached:function () {
                      
                       
                       

                },
                compositionComplete:function(){
                    $(function () {
                
                var ids = 6;
            
                // Mobiscroll Listview initialization
                $('#listviewUpdate-demo').mobiscroll().listview({
                    theme: $('#theme').val(),      // Specify theme like: theme: 'ios' or omit setting to use default
                    lang: $('#language').val(),    // Specify language like: lang: 'pl' or omit setting to use default
                    display: $('#display').val(),  // Specify display mode like: display: 'bottom' or omit setting to use default
                    mode: $('#mode').val(),
                    sortable: true,                // More info about sortable: https://docs.mobiscroll.com/3-0-0_beta2/listview#!opt-sortable
                    iconSlide: true,               // More info about iconSlide: https://docs.mobiscroll.com/3-0-0_beta2/listview#!opt-iconSlide
                    striped: true,                 // More info about striped: https://docs.mobiscroll.com/3-0-0_beta2/listview#!opt-striped
                    stages: [{                     // More info about stages: https://docs.mobiscroll.com/3-0-0_beta2/listview#!opt-stages
                        percent: 25,
                        color: 'crimson',
                        icon: 'checkmark',
                        text: 'Complete',
                        action: function (event, inst) {
                            $('.md-wo-status', event.target).text('Completed');
                        }
                    }, {
                        percent: -50,
                        color: 'red',
                        icon: 'remove',
                        text: 'Delete',
                        confirm: true,
                        action: function (event, inst) {
                            inst.remove(event.target);
                            return false;
                        }
                    }, {
                        percent: 50,
                        color: 'green',
                        icon: 'plus',
                        text: 'Spawn',
                        undo: true,                // More info about undo: https://docs.mobiscroll.com/3-0-0_beta2/listview#!methods-undo
                        action: function (event, inst) {
                            inst.add(++ids, 'Work order #listviewUpdate-000' + ids + ' created from WO #listviewUpdate-000' + $(event.target).attr('data-id') + '<div class="md-wo-status">Assigned</div>', event.index + 1);
                        }
                    }, {
                        percent: -25,
                        color: 'olive',
                        icon: 'clock',
                        text: 'Pending',
                        action: function (event, inst) {
                            $('.md-wo-status', event.target).text('Pending');
                        }
                    }],
                    onItemAdd: function () {       // More info about onItemAdd: https://docs.mobiscroll.com/3-0-0_beta2/listview#!event-onItemAdd
                        $('#listviewUpdate-demo_note').hide();
                    },
                    onItemRemove: function () {    // More info about onItemRemove: https://docs.mobiscroll.com/3-0-0_beta2/listview#!event-onItemRemove
                        if ($('li', this).length < 2) {
                            $('#listviewUpdate-demo_note').show();
                        }
                    }
                });
            
                $('#listviewUpdate-demo_note').click(function () {
                    window.location.reload();
                });
            
            });
                }

              
        };
}); 