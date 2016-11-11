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
                   // Use the settings object to change the theme
mobiscroll.settings = {
    theme: 'mobiscroll'
};

mobiscroll.menustrip('#demo', {
    theme: 'mobiscroll',
    lang: '',
    display: 'top',
    layout: 4,
    type: 'tabs',
    onItemTap: function (event, inst) {
        notify(event.target.querySelector('.mbsc-ms-item-i-c').innerHTML + ' clicked');
    },
    onMarkupReady: function (event, inst) {
        var i, b,
            badge,
            items = event.target.querySelectorAll('.mbsc-ms-item');

        for (i = 0; i < items.length; ++i) {
            badge = items[i].getAttribute('data-badge');
            if (badge) {
                b = document.createElement('span');
                b.className = 'md-badge';
                b.innerHTML = badge;

                items[i].appendChild(b);
            }
        }
    }
});

var notification = document.createElement('div'),
    notificationTimer;

notification.innerHTML = '<div class="demo-notification"><div class="demo-notification-i"></div></div>';
notification = notification.firstChild;
document.body.appendChild(notification);

function notify(text) {

    clearTimeout(notificationTimer);

    notification.style.display = 'block';
    notification.firstChild.innerHTML = text;

    if (notification.classList.contains('demo-notification-v')) {
        notification.classList.remove('demo-notification-v');
        notificationTimer = setTimeout(function () {
            notification.classList.add('demo-notification-v');
        }, 200);
    } else {
        notification.classList.add('demo-notification-v');
    }

    notificationTimer = setTimeout(function () {
        notification.classList.remove('demo-notification-v');
        notificationTimer = setTimeout(function () {
            notification.style.display = 'none';
        }, 200);
    }, 2000);
}
                }

              
        };
}); 