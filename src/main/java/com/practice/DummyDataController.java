package com.practice;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class DummyDataController {

	Map<String, String> dummyDataMap = Maps.newHashMap();

	static {

	}

	@RequestMapping(value = "/api/v1/kanban/cards", method = RequestMethod.GET)
	@ResponseBody
	public List<String> getKanbanDummyData() {
		return Lists.newArrayList();
	}
}
