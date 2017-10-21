//
//  DeviceInfo.m
//  RNTransplant
//
//  Created by kangxg on 2017/10/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RNDeviceInfo.h"
#import <UIKit/UIKit.h>
@implementation RNDeviceInfo
RCT_EXPORT_MODULE();
-(NSDictionary *)constantsToExport
{
  UIDevice * currentDevice = [UIDevice currentDevice];
  
  return @{@"systemName":currentDevice.systemName,
           @"systemVersion":currentDevice.systemVersion,
           @"deviceLocale":[self deviceLocale],
           @"appVersion":[[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"],
           };
}

-(NSString *)deviceLocale
{
  return [[NSLocale preferredLanguages] objectAtIndex:0];
}

-(NSString *)deviceCountry
{
  return [[NSLocale currentLocale] objectForKey:NSLocaleCountryCode];
}
@end
