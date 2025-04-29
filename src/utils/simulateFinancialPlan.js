export function simulateFinancialPlan(formData) {
    const {
        currentAsset,
        annualIncome,
        annualLivingCost,
        livingInflation,
        expectedCAGR,
        tuitionInflation,
        tuitionData,
        selectedSchool
    } = formData;

    // Khởi tạo kết quả
    const simulation = [];

    if (!tuitionData) {
        console.error('Tuition data is not loaded yet!');
        return [];
    }

    // Khởi tạo biến thời gian
    let year = new Date().getFullYear();
    let asset = parseFloat(currentAsset) * 1_000_000_000; // từ tỷ sang đồng
    let income = parseFloat(annualIncome) * 1_000_000_000;
    let livingCost = parseFloat(annualLivingCost) * 1_000_000_000;

    let tuitionInfo = tuitionData[selectedSchool];

    let tuitionIncreaseRate = parseFloat(tuitionInflation) / 100;
    let livingIncreaseRate = parseFloat(livingInflation) / 100;
    let growthRate = parseFloat(expectedCAGR) / 100;

    let maxYears = 40; // Giới hạn mô phỏng tối đa 40 năm để tránh vô hạn

    // Giả sử: Child 1 sinh 2021 (4 tuổi), Child 2 sinh 2024 (1 tuổi)
    const child1BirthYear = 2021;
    const child2BirthYear = 2024;

    // Đại học: giả sử chi phí 300 triệu/năm x 4 năm
    const universityCostPerYear = 300_000_000; // 300 triệu
    const child1StartUniversityYear = child1BirthYear + 5 + 12;
    const child2StartUniversityYear = child2BirthYear + 5 + 12;
    const child1EndUniversityYear = child1StartUniversityYear + 4;
    const child2EndUniversityYear = child2StartUniversityYear + 4;

    for (let i = 0; i < maxYears; i++) {
        // Tính học phí mỗi năm cho 2 con (từ mẫu giáo -> lớp 12)
        let tuitionCostThisYear = 0;
        const child1Age = year - child1BirthYear;
        const child2Age = year - child2BirthYear;

        tuitionCostThisYear += calculateTuitionForChild(child1Age, tuitionInfo);
        tuitionCostThisYear += calculateTuitionForChild(child2Age, tuitionInfo);

        // Tính chi phí đại học mỗi năm
        let universityCostThisYear = 0;

        if (year >= child1StartUniversityYear && year < child1EndUniversityYear) {
            universityCostThisYear += universityCostPerYear;
        }
        if (year >= child2StartUniversityYear && year < child2EndUniversityYear) {
            universityCostThisYear += universityCostPerYear;
        }

        // Tổng chi phí: sinh hoạt + học phí + đại học
        const totalCostThisYear = livingCost + tuitionCostThisYear + universityCostThisYear;

        // Asset tăng trưởng theo CAGR
        asset = asset * (1 + growthRate);

        // Asset bị trừ chi phí sinh hoạt + học phí + đại học
        asset = asset + income - totalCostThisYear;

        // Lưu kết quả năm nay
        simulation.push({
            year,
            asset,
            income,
            livingCost,
            tuitionCost: tuitionCostThisYear,
            universityCost: universityCostThisYear,
            totalCost: totalCostThisYear
        });

        year++;
        livingCost = livingCost * (1 + livingIncreaseRate);
    }

    const child1GraduateYear = child1BirthYear + 5 + 16;
    const child2GraduateYear = child2BirthYear + 5 + 16;

    // Add vào kết quả trả về
    return {
        simulation,
        graduateYears: {
            child1: child1GraduateYear,
            child2: child2GraduateYear
        }
    };
}

function calculateTuitionForChild(age, tuitionInfo) {
    if (age < 5) {
        return 0; // chưa đi học
    }

    let grade = '';

    if (age === 5) grade = 'Grade 1';
    else if (age === 6) grade = 'Grade 2';
    else if (age === 7) grade = 'Grade 3';
    else if (age === 8) grade = 'Grade 4';
    else if (age === 9) grade = 'Grade 5';
    else if (age === 10) grade = 'Grade 6';
    else if (age === 11) grade = 'Grade 7';
    else if (age === 12) grade = 'Grade 8';
    else if (age === 13) grade = 'Grade 9';
    else if (age === 14) grade = 'Grade 10';
    else if (age === 15) grade = 'Grade 11';
    else if (age === 16) grade = 'Grade 12';
    else return 0; // đã tốt nghiệp

    let cost = 0;

    if (tuitionInfo.Primary && tuitionInfo.Primary[grade]) {
        cost = tuitionInfo.Primary[grade];
    } else if (tuitionInfo.Secondary && tuitionInfo.Secondary[grade]) {
        cost = tuitionInfo.Secondary[grade];
    } else if (tuitionInfo.HighSchool && tuitionInfo.HighSchool[grade]) {
        cost = tuitionInfo.HighSchool[grade];
    }

    return cost;
}