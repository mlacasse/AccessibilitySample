#if defined(YI_ANDROID)
#include "AccessibilityInfoModule.h"

#include <youireact/YiReactNativeView.h>

#include <jni.h>

using namespace yi::react;

extern JNIEnv *GetEnv();
extern jobject cachedActivity;

YI_RN_DEFINE_EXPORT_METHOD(AccessibilityInfoModule, get)(Callback successCallback, Callback failedCallback)
{
    JNIEnv *pEnv = GetEnv();
    if (pEnv)
    {
        jclass _class = pEnv->FindClass("tv/youi/AccessibilityInfoModule");
        if (_class)
        {
            jmethodID _audible   = pEnv->GetStaticMethodID(_class, "_audible", "(Landroid/content/Context;)Z");
            jmethodID _generic   = pEnv->GetStaticMethodID(_class, "_generic", "(Landroid/content/Context;)Z");
            jmethodID _haptic    = pEnv->GetStaticMethodID(_class, "_haptic", "(Landroid/content/Context;)Z");
            jmethodID _spoken    = pEnv->GetStaticMethodID(_class, "_spoken", "(Landroid/content/Context;)Z");
            jmethodID _visual    = pEnv->GetStaticMethodID(_class, "_visual", "(Landroid/content/Context;)Z");
            jmethodID _braille   = pEnv->GetStaticMethodID(_class, "_braille", "(Landroid/content/Context;)Z");

            folly::dynamic accessibilityInfo = folly::dynamic::object;

            accessibilityInfo["audible"] = ToDynamic(pEnv->CallStaticBooleanMethod(_class, _audible, cachedActivity));
            accessibilityInfo["generic"] = ToDynamic(pEnv->CallStaticBooleanMethod(_class, _generic, cachedActivity));
            accessibilityInfo["braille"] = ToDynamic(pEnv->CallStaticBooleanMethod(_class, _braille, cachedActivity));
            accessibilityInfo["spoken"] = ToDynamic(pEnv->CallStaticBooleanMethod(_class, _spoken, cachedActivity));
            accessibilityInfo["haptic"] = ToDynamic(pEnv->CallStaticBooleanMethod(_class, _haptic, cachedActivity));
            accessibilityInfo["visual"] = ToDynamic(pEnv->CallStaticBooleanMethod(_class, _visual, cachedActivity));
            
            successCallback({ ToDynamic(accessibilityInfo) });
        }
    }
}
#endif
