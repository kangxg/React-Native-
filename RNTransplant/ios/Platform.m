//
//  Platform.m
//  RNTransplant
//
//  Created by kangxg on 2017/10/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "Platform.h"

@implementation Platform
RCT_EXPORT_MODULE();
-(NSDictionary *)constantsToExport
{
  return @{@"systemName":@"ios"};
}
@end
