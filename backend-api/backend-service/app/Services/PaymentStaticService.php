<?php

namespace App\Services;

abstract class PaymentStaticService
{
    abstract public function fetchAllCoursePayments();

    abstract public function fetchAllBundlePayments();

    abstract public function fetchOneCoursePayment($id);

    abstract public function fetchOneBundlePayment($id);

    abstract public function pendingCoursePayments();

    abstract public function pendingBundlePayments();

    abstract public function failedCoursePayments();

    abstract public function failedBundlePayments();

    abstract public function successfulCoursePayments();

    abstract public function successfulBundlePayments();

    abstract public function fetchCoursePayment($payment_reference);

    abstract public function fetchBundlePayment($payment_reference);
}
