


                             UI              ┌┐                        
        BUSINESS                                         DATABASE
                                             ││                        
    
                                       ┌┐
                                             ││                        
    
                                       ││
                                             ││                        
                                            ││
                                             ││    ┌───────────────────────┐                                        ││
                                             ││    │      UserValidator  
 │
                                       ││
                                             ││    │                   
 
 ├───────────────────────┐                ││
                                             ││    │                   
 
 │
                      │                ││
                                             ││    └───────────────────────┘
                      │                ││
                                             ││                ▲                                   │                ││
                                             ││                │                                   │                ││
                                             ││  ┌─────────────┼─────────DEPENDENCY INVERSION──────┼──────────────┐ ││
                 
                           ││  │             │         
                         │              │ ││
                  ┌───────────────────────┐  ││  │  ┌──────────┴────────────┐
         ┌───────────▼───────────┐
 │ ││
                  │       UserRouter  
   │  ││  │  │      UserBusiness     │
         │     IUserDataSource   │
 │ ││
                  │                   
   │  ││  │  │                       │
         │                       │
 │ ││
                  │                   
   │  ││  │  │                       │
         │                       │
 │ ││
                  │                   
   │  ││  │  │                       │
         │                       │
 │ ││
         INPUT───►│                       ├──┼┼──┼─►│                       ├─────────►│                       │
 │ ││
                  │                   
 
 │  ││  │  │                     
 │
         │                       │
 │ ││
                  │                   
 
 │  ││  │  │                     
 │
         │                       │
 │ ││
                  │                   
 
 │  ││  │  │                     
 │
         │                       │
 │ ││
                  └───────────────────────┘  ││  │  └───────────────────────┘
         └───────────────────────┘
 │ ││
                                             ││  │              .   
                              ▲              │ ││
                                             ││  │              .   
                              │              │ ││
                                             ││  │              .                                  │              │ ││
                                             ││  │              .                      
           │              │ ││
                                             ││  │              .                      ┌───────────┴───────────┐
 │ ││   ┌───────────────────────┐
                                             ││  │              .                      │     UserDataSource    │
 │ ││   │       IDatabase   
   │
                                             ││  │              .                      │                       │
 │ ││   │                   
   │
                                             ││  │              .                      │                       │
 │ ││   │                   
   │
                                             ││  │              .......................│                       ├──┼─┼┼──►│                   
   │
                                             ││  │                   Flow of control   │                       │
 │ ││   │                       │
                                             ││  │                                     │                     
 │
 │ ││   │                   
 
 │
                                             ││  │                                     │             
       
 │
 │ ││   │                   
 
 │
                                             ││  │                                     │                     
 │
 │ ││   │                   
 
 │
                                             ││  │                                     └───────────────────────┘
 │ ││   └───────────────────────┘
                                             ││  │                                     
          .               │ ││               ▲
                                             ││  └────────────────────────────────────────────────.───────────────┘ ││               │
                                             ││                                                   .                 ││               │
                                             ││                                                   .                 ││   
           │
                                             └┘                                                   .                 ││   ┌───────────┴───────────┐
                                                                                                  .                 ││   │       MockDatabase
   │
                                                                                                  .                 ││   │                   
   │
                                                                                                  .                 ││   │                   
   │
                                                                                                  .                 ││   │                   
   │
                                                                                                  ..................││...│                       │
                                                                                                    Flow of control ││  
│                   
 
 │
                                                                                                                    ││   │                   
 
 │
                                                                                                                    ││   │                   
 
 │
                                                                                                                    └┘   └───────────────────────┘

