//
//  ImagePicker.h
//  RNTransplant
//
//  Created by kangxg on 2017/10/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
@interface ImagePicker : NSObject<RCTBridgeModule,UINavigationControllerDelegate,UIImagePickerControllerDelegate>

@end
